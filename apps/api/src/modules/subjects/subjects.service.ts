import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common';
import { Repository } from 'typeorm';
import { UtilsService } from '../utils/utils.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectsService extends BaseService<Subject, CreateSubjectDto, UpdateSubjectDto> {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {
    super(subjectRepository);
  }

  async remove(id: number) {
    const subject = await this.findOneBy({ id });
    if (subject?.image) {
      await this.utilsService.unlinkAsync(subject.image);
    }
    return this.subjectRepository.remove(subject);
  }
}
