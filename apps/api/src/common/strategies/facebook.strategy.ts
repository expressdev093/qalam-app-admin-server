import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginProvider } from 'src/modules/users/enum/login-provider.enum';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('FACEBOOK_CLIENT_ID'),
      clientSecret: configService.get<string>('FACEBOOK_CLIENT_SECRET'),
      callbackURL: configService.get<string>('FACEBOOK_CALLBACK_URL'),
      profileFields: ['id', 'displayName', 'email', 'picture', 'name'],
      scope: 'email',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
    const facebookUser = await this.authService.validateFacebookUser(
      profile,
      LoginProvider.Facebook,
    );

    return this.authService.login(facebookUser);
  }
}
