import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateQuizMcqoptionDto {
   
    @IsString()
    @IsNotEmpty()
  text: string;

  @IsOptional()
  @IsString()
  detailAnswer?: string;

  @IsBoolean()
  isCorrect: boolean;

  @IsNumber()
  quizMcqId: number;
}
