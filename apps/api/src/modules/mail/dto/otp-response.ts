import { User } from 'src/modules/users/entities/user.entity';

export class OtpResponse {
  otp: number;

  username: string;

  message: string;

  success: boolean;
}
