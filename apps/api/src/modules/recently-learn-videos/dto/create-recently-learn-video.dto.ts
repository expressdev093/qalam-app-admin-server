import { IsNumber } from 'class-validator';

export class CreateRecentlyLearnVideoDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  topicVideoId: number;
}
