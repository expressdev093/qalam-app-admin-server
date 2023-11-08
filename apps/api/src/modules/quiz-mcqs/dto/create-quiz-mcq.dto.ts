import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateQuizMcqDto {
    @IsString()
    @IsNotEmpty()
    text: string;
  
    @IsNumber()
    quizId: number;
}
