import { IsBoolean, IsNumber, Min } from 'class-validator';

export class CreateUserQuizAnswerDto {
  @IsNumber()
  @Min(1)
  userQuizId: number;

  @IsNumber()
  @Min(1)
  selectedOptionId: number;

  @IsBoolean()
  isCorrect: boolean;
}
