import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-apple';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginProvider } from 'src/modules/users/enum/login-provider.enum';

@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy, 'apple') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('APPLE_CLIENT_ID'),
      teamID: configService.get<string>('APPLE_TEAM_ID'),
      keyID: configService.get<string>('APPLE_KEY_ID'),
      privateKey: configService.get<string>('APPLE_PRIVATE_KEY').replace(/\\n/g, '\n'),
      callbackURL: configService.get<string>('APPLE_CALLBACK_URL'),
      scope: ['name', 'email'],
      passReqToCallback: false,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const appleUser = await this.authService.validateAppleUser(profile, LoginProvider.Apple);
    return this.authService.login(appleUser);
  }
}
