import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { SingleIdParams } from './single-id.params';

export class ArrayIdParams {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SingleIdParams)
  id?: SingleIdParams[];
}
