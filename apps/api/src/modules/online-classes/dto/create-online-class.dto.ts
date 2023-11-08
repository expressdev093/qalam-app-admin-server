import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOnlineClassDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsBoolean()
  @IsOptional()
  isEnded?: boolean;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsNumber()
  topicId: number;

  @IsNumber()
  chapterId: number;

  @IsNumber()
  subjectId: number;
}
