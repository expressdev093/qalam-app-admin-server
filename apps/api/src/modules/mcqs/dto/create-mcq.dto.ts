import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMcqDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNumber()
  exerciseId: number;
}
