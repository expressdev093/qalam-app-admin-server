import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { TopicVideo } from '../topic-videos/entities/topic-video.entity';
import { TopicsGateway } from './topics.gateway';
import { TopicView } from './entities/topic.view';
import { TopicVideosView } from './entities/topic-video.view';

@Module({
  imports: [TypeOrmModule.forFeature([Topic, TopicVideo, TopicVideosView, TopicView])],
  controllers: [TopicsController],
  providers: [TopicsService, TopicsGateway],
})
export class TopicsModule {}
