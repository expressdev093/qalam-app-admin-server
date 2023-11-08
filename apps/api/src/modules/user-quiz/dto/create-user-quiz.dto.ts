import { IsBoolean, IsNumber, Min } from 'class-validator';

export class CreateUserQuizDto {
  @IsBoolean()
  isCompleted: boolean;

  @IsNumber()
  @Min(0)
  passingScore: number;

  @IsNumber()
  @Min(0)
  totalScore: number;

  @IsNumber()
  @Min(0)
  correctAnswers: number;

  @IsNumber()
  @Min(0)
  inCorrectAnswers: number;

  @IsNumber()
  @Min(1)
  userId: number;

  @IsNumber()
  @Min(1)
  quizId: number;
}
