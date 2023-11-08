import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UtilsService } from '../utils/utils.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService extends BaseService<Question, CreateQuestionDto, UpdateQuestionDto> {
  constructor(
    @InjectRepository(Question) private readonly questionRepository: Repository<Question>,
  ) {
    super(questionRepository);
  }

  async saveAll(createQuestionDtos: CreateQuestionDto[]) {
    const bulkQuestions = createQuestionDtos.map((q) => this.questionRepository.create(q));
    return this.questionRepository.save(bulkQuestions);
  }
}
