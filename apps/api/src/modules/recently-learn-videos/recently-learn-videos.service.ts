import { Injectable } from '@nestjs/common';
import { CreateRecentlyLearnVideoDto } from './dto/create-recently-learn-video.dto';
import { UpdateRecentlyLearnVideoDto } from './dto/update-recently-learn-video.dto';
import { BaseService } from 'src/common';
import { RecentlyLearnVideo } from './entities/recently-learn-video.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecentlyLearnVideosService extends BaseService<
  RecentlyLearnVideo,
  CreateRecentlyLearnVideoDto,
  UpdateRecentlyLearnVideoDto
> {
  constructor(
    @InjectRepository(RecentlyLearnVideo)
    private readonly recentlyLearnVideoRepository: Repository<RecentlyLearnVideo>,
  ) {
    super(recentlyLearnVideoRepository);
  }

  async create(createDto: CreateRecentlyLearnVideoDto): Promise<RecentlyLearnVideo> {
    const recentlyLearnVideo = await this.findOneBy({
      userId: createDto.userId,
      topicVideoId: createDto.topicVideoId,
    });
    if (recentlyLearnVideo) {
      return this.recentlyLearnVideoRepository.save({
        ...recentlyLearnVideo,
        updatedAt: new Date(),
      });
    }
    const createNew = this.recentlyLearnVideoRepository.create(createDto as any);
    return this.recentlyLearnVideoRepository.save(createNew as any);
  }
}
