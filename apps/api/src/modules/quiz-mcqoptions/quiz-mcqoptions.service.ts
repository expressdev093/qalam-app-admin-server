import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common';
import { Repository } from 'typeorm';
import { UtilsService } from '../utils/utils.service';
import { CreateQuizMcqoptionDto } from './dto/create-quiz-mcqoption.dto';
import { UpdateQuizMcqoptionDto } from './dto/update-quiz-mcqoption.dto';
import { QuizMcqoption } from './entities/quiz-mcqoption.entity';

@Injectable()
export class QuizMcqoptionsService extends BaseService<
  QuizMcqoption,
  CreateQuizMcqoptionDto,
  UpdateQuizMcqoptionDto
> {
  constructor(
    @InjectRepository(QuizMcqoption)
    private readonly quizMcqOptionRepository: Repository<QuizMcqoption>,
  ) {
    super(quizMcqOptionRepository);
  }

  async saveAll(options: CreateQuizMcqoptionDto[]) {
    const bulkOptions = options.map((op) => this.quizMcqOptionRepository.create(op));
    return this.quizMcqOptionRepository.save(bulkOptions);
  }
}
