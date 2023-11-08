import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLoginDeviceInfoDto {
  @IsNotEmpty()
  @IsString()
  firebaseToken: string;

  @IsNotEmpty()
  @IsString()
  deviceName: string;

  @IsNotEmpty()
  @IsString()
  deviceId: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  ipAddress: string;

  @IsDateString()
  @IsNotEmpty()
  lastLogin: string;

  @IsBoolean()
  isCurrentDevice: boolean;

  @IsNumber()
  userId: number;
}
