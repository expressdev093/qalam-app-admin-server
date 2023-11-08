import { IsNumber, Max, Min } from 'class-validator';

export class CreateVideoRatingDto {
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @IsNumber()
  userId: number;

  @IsNumber()
  videoId: number;
}
