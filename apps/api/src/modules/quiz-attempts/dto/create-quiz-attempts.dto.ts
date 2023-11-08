import { IsDateString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateQuizAttemptDto {
@IsDateString()
@IsNotEmpty()
startedAt: string;

@IsDateString()
@IsNotEmpty()
@IsOptional()
completedAt?: string;

@IsNumber()
@IsOptional()
score?: number;

@IsNumber()
userId: number;

@IsNumber()
quizId: number;

}
