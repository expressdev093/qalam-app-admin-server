import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { QuestionType } from '../enum/question-type.enum';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  answer: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsNumber()
  exerciseId: number;
}
