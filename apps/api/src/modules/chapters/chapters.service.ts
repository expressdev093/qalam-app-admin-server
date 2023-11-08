import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { UtilsService } from '../utils/utils.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { Chapter } from './entities/chapter.entity';
import { ChapterView } from './entities/chapter.view';

@Injectable()
export class ChaptersService extends BaseService<Chapter, CreateChapterDto, UpdateChapterDto> {
  constructor(
    @InjectRepository(Chapter)
    private readonly chapterRepository: Repository<Chapter>,
    @InjectRepository(ChapterView)
    private readonly chapterViewRepository: Repository<ChapterView>,
  ) {
    super(chapterRepository);
  }

  findOne(id: number) {
    return this.chapterRepository.findOne({
      where: {
        id,
      },
      relations: {
        subject: true,
      },
    });
  }

  async remove(id: number) {
    const chapter = await this.findOne(id);
    if (chapter.image) {
      await this.utilsService.unlinkAsync(chapter.image);
    }
    return this.chapterRepository.remove(chapter);
  }

  async chapterSubjectFindAll() {
    return this.chapterViewRepository.find();
  }
}
