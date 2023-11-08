import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Role } from '../users/enum/role.enum';
import { LoginProvider } from '../users/enum/login-provider.enum';
import { MailService } from '../mail/mail.service';
import { OTPCodeService } from '../otp-codes/otp-codes.service';
import { LoginSocialInput } from './dto/login-social.inputs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    private mailService: MailService,
    private jwtService: JwtService,
    private otpCodeService: OTPCodeService,
    private configService: ConfigService,
  ) {}
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneBy({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async validateGoogleUser(googleUser: any, loginProvider: LoginProvider): Promise<any> {
    // find the user by the googleId in your database
    const json = googleUser._json;

    const user = await this.userService.findOneBy({ googleId: json.sub });

    // if the user doesn't exist, create a new user
    if (!user) {
      const newUser: CreateUserDto = {
        email: json.email,
        googleId: json.sub,
        password: null,
        role: Role.User,
        provider: loginProvider,
        firstName: json.given_name,
        lastName: json.family_name,
        isVerified: json.email_verified,
      };
      return await this.userService.create(newUser);
    }
    return user;
  }

  async validateFacebookUser(facebookUser: any, loginProvider: LoginProvider): Promise<any> {
    const json = facebookUser._json;
    // find the user by the facebookId in your database
    const user = await this.userService.findOneBy({ facebookId: json.id });

    // if the user doesn't exist, create a new user
    if (!user) {
      const newUser: CreateUserDto = {
        email: json.email,
        facebookId: json.id,
        password: null,
        provider: loginProvider,
        role: Role.User,
        firstName: json.first_name,
        lastName: json.last_name,
        // add any other properties you want to save in the database
      };
      return await this.userService.create(newUser);
    }

    // if the user exists, return the user
    return user;
  }

  async validateAppleUser(appleProfile: any, loginProvider: LoginProvider): Promise<any> {
    const { name, email, sub } = appleProfile;

    // find the user by the facebookId in your database
    const user = await this.userService.findOneBy({ appleId: sub });

    // if the user doesn't exist, create a new user
    if (!user) {
      const newUser: CreateUserDto = {
        email: email,
        appleId: sub,
        provider: loginProvider,
        password: null,
        role: Role.User,
        firstName: name.firstName,
        lastName: name.lastName,
        // add any other properties you want to save in the database
      };
      return await this.userService.create(newUser);
    }

    // if the user exists, return the user
    return user;
  }

  async login(user: User) {
    const { password, ...restUser } = user;
    const payload = { email: user.email, sub: user.id };
    return {
      user: restUser,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      const { password, ...rest } = user;
      if (!user.isVerified) {
        const code = this.generateOTP();
        await this.otpCodeService.create(user.id, code, 5 * 60);
        this.mailService.sendUserConfirmationEmail({
          email: createUserDto.email,
          token: this.jwtService.sign(
            { email: user.email, sub: user.id, code: code },
            {
              expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
            },
          ),
        });
        return {
          user: rest,
          isVerified: false,
          message: 'We have send you a verification email, plase verify your email.',
        };
      }

      return this.login(user);
    } catch (error) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }
  }

  async verifyToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
        return {
          message: 'Verification link is expired. try again.',
        };
      }

      const otpCode = await this.otpCodeService.findByCodeAndUser(decoded.code, decoded.sub);
      if (otpCode) {
        const user = await this.userService.update(decoded.sub, { isVerified: true });
        const { password, ...rest } = user;
        await this.otpCodeService.remove(otpCode);
        return {
          user: rest,
          isVerified: user.isVerified,
          message: 'Verified Successfully',
        };
      } else {
        return {
          message: 'Verification link is expired. try again.',
        };
      }
    } catch (err) {
      throw Error('Verification link is expired. try again.');
    }
  }

  async verifyOtp(otp: string, email: string) {
    const user = await this.userService.findOneBy({ email });
    const otpCode = await this.otpCodeService.findByCodeAndUser(otp, user.id);
    if (otpCode) {
      await this.otpCodeService.remove(otpCode);
      return {
        isVerified: true,
        message: 'Email verified successfully',
      };
    }
    throw new HttpException('Invalid otp code', HttpStatus.UNAUTHORIZED);
  }

  generateOTP(): string {
    const digits = '0123456789';
    let OTP = '';

    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }

    return OTP;
  }

  async sendNewOtp(email: string) {
    const { password, ...user } = await this.userService.findOneBy({ email });
    const code = this.generateOTP();
    await this.otpCodeService.create(user.id, code, 5 * 60);
    this.mailService.sendVerificationOTP({
      email: email,
      code: code,
      token: this.jwtService.sign(
        { email: user.email, sub: user.id, code: code },
        {
          expiresIn: '5m',
        },
      ),
    });

    return {
      email: email,
      message: 'We have send you a verification email, plase verify your email.',
    };
  }

  async loginSocial(loginSocialInput: LoginSocialInput) {
    const user = await this.userService.findOneBy({
      email: loginSocialInput.email,
      provider: loginSocialInput.provider,
    });

    if (user) {
      return this.login(user);
    } else {
      throw new HttpException(
        `User not reigstered as ${loginSocialInput.provider}`,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async isEmailRegistered(email: string) {
    try {
      const user = await this.userService.findOneBy({ email });
      return {
        isEmailRegistered: true,
        message: 'Email already in use',
      };
    } catch (err) {
      return {
        isEmailRegistered: false,
        message: 'Email available',
      };
    }
  }
}
