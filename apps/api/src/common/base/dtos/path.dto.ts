import { IsNotEmpty, IsString } from 'class-validator';

export class PathDto {
  @IsString()
  @IsNotEmpty()
  path: string;
}
