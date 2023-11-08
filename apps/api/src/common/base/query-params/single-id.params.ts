import { IsInt, IsNumber } from 'class-validator';

export class SingleIdParams {
  @IsInt()
  @IsNumber()
  id?: number;
}
