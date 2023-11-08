import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { OtpResponse } from './dto/otp-response';
import { SendOtpInput } from './inputs/send-otp.input';
import { MailDto } from './dto/mail.dto';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendUserConfirmationEmail(sendOtpInput: SendOtpInput): Promise<OtpResponse> {
    const otp = this.generateOtp();
    const { email, token } = sendOtpInput;
    const url = `http://${this.configService.get<string>('HOST')}:${this.configService.get<number>(
      'PORT',
    )}/api/auth/confirm-email?token=${token}`;

    try {
      await this.mailerService.sendMail({
        to: email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Welcome to Qalam Learning! Confirm your Email',
        template: `./email-verification`, // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          code: otp,
          url,
        },
      });

      return {
        username: email,
        otp,
        message: 'Verification email sent',
        success: true,
      };
    } catch (e) {
      return {
        username: email,
        otp,
        message: e.message || 'Verification email not sent',
        success: false,
      };
    }
  }

  async sendVerificationOTP(sendOtpInput: SendOtpInput): Promise<OtpResponse> {
    const { email, token } = sendOtpInput;
    const url = `http://${this.configService.get<string>('HOST')}:${this.configService.get<number>(
      'PORT',
    )}/api/auth/confirm-email?token=${token}`;

    try {
      await this.mailerService.sendMail({
        to: email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Welcome to Qalam Learning! Confirm your Email',
        template: `./email-otp-verification`, // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          code: sendOtpInput.code,
          url,
        },
      });

      return {
        username: email,
        otp: parseInt(sendOtpInput.code),
        message: 'Verification email sent',
        success: true,
      };
    } catch (e) {
      return {
        username: email,
        otp: parseInt(sendOtpInput.code),
        message: e.message || 'Verification email not sent',
        success: false,
      };
    }
  }

  //generate 4 number otp
  generateOtp(): number {
    return Math.floor(1000 + Math.random() * 9000);
  }

  async sendTestEmail(mailDto: MailDto) {
    const otp = this.generateOtp();
    const { email } = mailDto;

    try {
      await this.mailerService.sendMail({
        to: email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: '[Test Email] Welcome to Qalam Learning! Confirm your Email',
        template: `./email-verification`, // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          code: otp,
          url: 'url',
        },
      });

      return {
        username: email,
        otp,
        message: 'Verification email sent',
        success: true,
      };
    } catch (e) {
      console.log(e);
      return {
        username: email,
        otp,
        message: e.message || 'Verification email not sent',
        success: false,
      };
    }
  }
}
