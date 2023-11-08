import { Module } from '@nestjs/common';
import { VideoRatingsService } from './video-ratings.service';
import { VideoRatingsController } from './video-ratings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoRating } from './entities/video-rating.entity';
@Module({
  imports: [TypeOrmModule.forFeature([VideoRating])],
  controllers: [VideoRatingsController],
  providers: [VideoRatingsService],
})
export class VideoRatingsModule {}
