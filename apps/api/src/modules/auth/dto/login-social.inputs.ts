import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { LoginProvider } from 'src/modules/users/enum/login-provider.enum';

export class LoginSocialInput {
  @IsEnum(LoginProvider)
  provider: LoginProvider;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
