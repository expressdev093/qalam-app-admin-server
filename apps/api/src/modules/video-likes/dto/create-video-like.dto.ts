import { IsBoolean, IsNumber } from 'class-validator';

export class CreateVideoLikeDto {
  @IsBoolean()
  isLiked: boolean;

  @IsNumber()
  userId: number;

  @IsNumber()
  videoId: number;
}
