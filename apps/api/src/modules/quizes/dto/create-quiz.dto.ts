import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { QuizType } from '../enum/quiz-type.enum';

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @IsNumber()
  passingScore: number;

  @IsEnum(QuizType)
  type: QuizType;

  @IsString()
  url: string;

  @IsNumber()
  @IsOptional()
  entityId?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsNumber()
  totalTime: number;
}
