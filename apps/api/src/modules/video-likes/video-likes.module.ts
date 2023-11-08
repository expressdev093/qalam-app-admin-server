import { Module } from '@nestjs/common';
import { VideoLikesService } from './video-likes.service';
import { VideoLikesController } from './video-likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoLike } from './entities/video-like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VideoLike])],
  controllers: [VideoLikesController],
  providers: [VideoLikesService],
})
export class VideoLikesModule {}
