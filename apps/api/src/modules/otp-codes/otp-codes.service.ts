import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThanOrEqual, Repository } from 'typeorm';
import { OTPCode } from './entities/otp-codes.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class OTPCodeService {
  constructor(
    @InjectRepository(OTPCode)
    private readonly otpCodeRepository: Repository<OTPCode>,
  ) {}

  async create(userId: number, code: string, expiresIn: number): Promise<OTPCode> {
    const existingOtp = await this.otpCodeRepository.findOneBy({ userId: userId });
    if (existingOtp) {
      this.otpCodeRepository.remove(existingOtp);
    }
    const otpCode = new OTPCode();
    otpCode.userId = userId;
    otpCode.code = code;
    otpCode.expiresAt = new Date(Date.now() + expiresIn * 1000);
    return this.otpCodeRepository.save(otpCode);
  }

  async findByCodeAndUser(code: string, userId: number): Promise<OTPCode> {
    return this.otpCodeRepository.findOneBy({
      userId: userId,
      code,
      expiresAt: MoreThanOrEqual(new Date()),
    });
  }

  async deleteExpiredCodes(): Promise<void> {
    await this.otpCodeRepository.delete({
      expiresAt: LessThan(new Date()),
    });
  }

  async remove(otpCode: OTPCode) {
    return this.otpCodeRepository.remove(otpCode);
  }
}
