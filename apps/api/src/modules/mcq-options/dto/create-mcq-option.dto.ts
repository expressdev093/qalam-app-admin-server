import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMcqOptionDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsBoolean()
  isCorrect: boolean;

  @IsNumber()
  mcqId: number;

  @IsOptional()
  @IsString()
  detailAnswer?: string;
}
