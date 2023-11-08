import { Module } from '@nestjs/common';
import { TopicVideosService } from './topic-videos.service';
import { TopicVideosController } from './topic-videos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicVideo } from './entities/topic-video.entity';
import { TopicVideosGateway } from './topic-videos.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([TopicVideo])],
  controllers: [TopicVideosController],
  providers: [TopicVideosService, TopicVideosGateway],
  exports: [TopicVideosService],
})
export class TopicVideosModule {}
