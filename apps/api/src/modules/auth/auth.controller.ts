import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Req,
  HttpStatus,
  Query,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, Private, Public } from 'src/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { VerifyOtpInput } from './dto/verify-otp.inputs';
import { LoginSocialInput } from './dto/login-social.inputs';
import { Role } from '../users/enum/role.enum';

@Public()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    const role: Role = req.body?.role ?? Role.Admin;
    const userData = await this.authService.login(req.user);
    if (userData.user.role !== role) {
      throw new UnauthorizedException('Invalid email or password');
    } else return userData;
  }

  @Post('login-social')
  async loginSocial(@Body() loginSocialInput: LoginSocialInput) {
    return this.authService.loginSocial(loginSocialInput);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Private()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user.withoutPassword();
  }

  @Get('confirm-email')
  confirmEmail(@Query('token') token: string) {
    return this.authService.verifyToken(token);
  }

  @Get('email-registered')
  emailRegistered(@Query('email') email: string) {
    return this.authService.isEmailRegistered(email);
  }

  @Put('verify-otp')
  verifyOtp(@Body() verifyOtpInput: VerifyOtpInput) {
    return this.authService.verifyOtp(verifyOtpInput.otp, verifyOtpInput.email);
  }

  @Put('send-otp')
  sendNewOtp(@Body('email') email: string) {
    return this.authService.sendNewOtp(email);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    return HttpStatus.OK;
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    // handles the Google OAuth2 callback and retrieves the user's information
    return req.user;
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req): Promise<any> {
    return req.user;
  }

  @UseGuards(AuthGuard('apple'))
  async appleLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/apple/redirect')
  @UseGuards(AuthGuard('apple'))
  async appleLoginRedirect(@Req() req: any) {
    return req.user;
  }
}
