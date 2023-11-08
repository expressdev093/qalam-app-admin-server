import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common';
import { Repository } from 'typeorm';
import { CreateVideoLikeDto } from './dto/create-video-like.dto';
import { UpdateVideoLikeDto } from './dto/update-video-like.dto';
import { VideoLike } from './entities/video-like.entity';

@Injectable()
export class VideoLikesService extends BaseService<
  VideoLike,
  CreateVideoLikeDto,
  UpdateVideoLikeDto
> {
  constructor(
    @InjectRepository(VideoLike)
    private readonly videoLikeRepository: Repository<VideoLike>,
  ) {
    super(videoLikeRepository);
  }

  async unlike(updateVideoLikeDto: UpdateVideoLikeDto): Promise<number> {
    const videoLiked = await this.videoLikeRepository.findOneBy({
      userId: updateVideoLikeDto.userId,
      videoId: updateVideoLikeDto.videoId,
    });
    if (videoLiked) {
      await this.remove(videoLiked.id);
    }

    return await this.count({ videoId: updateVideoLikeDto.videoId });
  }

  async like(createVideoLikeDto: CreateVideoLikeDto): Promise<number> {
    await this.create(createVideoLikeDto);
    return await this.count({ videoId: createVideoLikeDto.videoId });
  }
}
