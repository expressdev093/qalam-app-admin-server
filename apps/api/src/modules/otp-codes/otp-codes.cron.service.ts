import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { OTPCodeService } from './otp-codes.service';

@Injectable()
export class OTPCodeCronService {
  private readonly logger = new Logger(OTPCodeCronService.name);
  constructor(private readonly otpCodeService: OTPCodeService) {}

  @Cron('0 */5 * * * *')
  async handleCron() {
    this.logger.debug('Expired otp code is removed');
    await this.otpCodeService.deleteExpiredCodes();
  }
}
