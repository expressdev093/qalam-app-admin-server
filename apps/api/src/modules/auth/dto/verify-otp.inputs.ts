import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class VerifyOtpInput {
  @IsString()
  @IsNotEmpty()
  @MaxLength(4)
  @MinLength(4)
  otp: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}
