import { IsNumber, IsOptional } from 'class-validator';
import { PaginationQueryParam } from 'src/common';

export class TopicVideoParams extends PaginationQueryParam {
  @IsNumber()
  @IsOptional()
  topicId?: number;
}
