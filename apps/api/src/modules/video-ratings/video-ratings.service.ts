import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common';
import { Repository } from 'typeorm';
import { CreateVideoRatingDto } from './dto/create-video-rating.dto';
import { UpdateVideoRatingDto } from './dto/update-video-rating.dto';
import { VideoRating } from './entities/video-rating.entity';

@Injectable()
export class VideoRatingsService extends BaseService<
  VideoRating,
  CreateVideoRatingDto,
  UpdateVideoRatingDto
> {
  constructor(
    @InjectRepository(VideoRating)
    private readonly videoRatingRepository: Repository<VideoRating>,
  ) {
    super(videoRatingRepository);
  }

  async getRatingByVideoId(videoId: number): Promise<number> {
    const ratings = await this.videoRatingRepository.find({
      where: {
        videoId: videoId,
      },
    });

    if (ratings.length === 0) {
      return 0;
    }

    const totalScore = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    const averageScore = totalScore / ratings.length;

    return averageScore;
  }
}
