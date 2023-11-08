import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OTPCode } from './entities/otp-codes.entity';
import { OTPCodessGateway } from './otp-codes.gateway';
import { OTPCodeCronService } from './otp-codes.cron.service';
import { OTPCodeService } from './otp-codes.service';

@Module({
  imports: [TypeOrmModule.forFeature([OTPCode])],
  controllers: [],
  providers: [OTPCodeService, OTPCodeCronService, OTPCodessGateway],
  exports: [OTPCodeService],
})
export class OTPCodesModule {}
