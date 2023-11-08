import { Module } from '@nestjs/common';
import { RecentlyLearnVideosService } from './recently-learn-videos.service';
import { RecentlyLearnVideosController } from './recently-learn-videos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecentlyLearnVideo } from './entities/recently-learn-video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecentlyLearnVideo])],
  controllers: [RecentlyLearnVideosController],
  providers: [RecentlyLearnVideosService],
})
export class RecentlyLearnVideosModule {}
