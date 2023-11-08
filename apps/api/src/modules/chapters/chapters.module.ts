import { Module } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { ChaptersController } from './chapters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chapter } from './entities/chapter.entity';
import { ChaptersGateway } from './chapters.gateway';
import { ChapterView } from './entities/chapter.view';

@Module({
  imports: [TypeOrmModule.forFeature([Chapter, ChapterView])],
  controllers: [ChaptersController],
  providers: [ChaptersService, ChaptersGateway],
})
export class ChaptersModule {}
