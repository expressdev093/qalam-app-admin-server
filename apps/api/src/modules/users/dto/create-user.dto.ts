import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { LoginProvider } from '../enum/login-provider.enum';
import { Role } from '../enum/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(5)
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  countryCode?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  countryShortCode?: string;

  @IsEnum(Role)
  role: Role;

  @IsEnum(LoginProvider)
  @IsOptional()
  provider?: LoginProvider;

  @IsString()
  @IsOptional()
  googleId?: string;

  @IsString()
  @IsOptional()
  facebookId?: string;

  @IsString()
  @IsOptional()
  appleId?: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  avatar?: string;

  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsNumber()
  @IsOptional()
  boardClassId?: number;

  @IsNumber()
  @IsOptional()
  boardId?: number;
}
