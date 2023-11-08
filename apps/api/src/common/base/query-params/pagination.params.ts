import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { BaseQueryParam } from './base.params';

export class PaginationQueryParam extends BaseQueryParam {
  @IsNumber()
  @IsOptional()
  _start?: number;

  @IsOptional()
  @IsNumber()
  _end?: number;
}
