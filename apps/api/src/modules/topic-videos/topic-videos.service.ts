import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common';
import { Repository } from 'typeorm';
import { CreateTopicVideoDto } from './dto/create-topic-video.dto';
import { UpdateTopicVideoDto } from './dto/update-topic-video.dto';
import { TopicVideo } from './entities/topic-video.entity';

@Injectable()
export class TopicVideosService extends BaseService<
  TopicVideo,
  CreateTopicVideoDto,
  UpdateTopicVideoDto
> {
  constructor(
    @InjectRepository(TopicVideo)
    private readonly topicVideoRepository: Repository<TopicVideo>,
  ) {
    super(topicVideoRepository);
  }

  async findAllBy(params: any) {
    const { where, order } = await this.utilsService.parseParams<TopicVideo>(params);
    const videos = await this.topicVideoRepository.find({
      where: where,
      order,
      relations: {
        videoRatings: true,
        videoLikes: true,
      },
    });

    videos.forEach((video) => {
      this.getCalculateRatingsAndLikes(video);
    });

    return videos;
  }

  private getCalculateRatingsAndLikes(video: TopicVideo): TopicVideo {
    if (video.videoRatings === undefined || video.videoRatings.length === 0) {
      video.totalRatings = 0;
    } else {
      const totalScore = video.videoRatings.reduce((sum, rating) => sum + rating.rating, 0);
      const averageScore = totalScore / video.videoRatings.length;
      video.totalRatings = averageScore;
    }

    video.videoRatings = undefined;

    video.totalLikes = (video.videoLikes ?? []).length;
    video.videoLikes = undefined;

    return video;
  }

  async findOne(id: number) {
    const video = await this.topicVideoRepository.findOne({
      where: {
        id,
      },
      relations: {
        videoLikes: true,
        videoRatings: true,
      },
    });
    return this.getCalculateRatingsAndLikes(video);
  }

  async remove(id: number): Promise<TopicVideo> {
    const topicVideo = await this.topicVideoRepository.findOneBy({ id });
    await this.utilsService.unlinkAsync(topicVideo.url);
    await this.utilsService.unlinkAsync(topicVideo.thumbnail);
    return this.topicVideoRepository.remove(topicVideo);
  }

  async incrementVideoCount(id: number): Promise<TopicVideo> {
    const topicVideo = await this.topicVideoRepository.findOneBy({ id });
    topicVideo.views = topicVideo.views + 1;
    return await this.topicVideoRepository.save({ ...topicVideo });
  }

  async topPickForYou(params: any): Promise<TopicVideo[]> {
    // Fetch videos with their like counts
    var query = `SELECT
      v.*,
      COUNT(l.id) AS likes_count
    FROM
      topic_videos v
      LEFT JOIN video_likes l ON v.id = l.video_id
    GROUP BY
      v.id
    ORDER BY
      likes_count DESC,
      v.views DESC`;

    if (params?.limit) {
      query = `${query} 
          LIMIT ${params.limit}
      `;
    }
    const videos: TopicVideo[] = await this.topicVideoRepository.query(query);
    return videos;
  }
}
