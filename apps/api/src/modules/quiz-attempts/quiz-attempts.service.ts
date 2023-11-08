import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common';
import { Repository } from 'typeorm';
import { UtilsService } from '../utils/utils.service';
import { CreateQuizAttemptDto } from './dto/create-quiz-attempts.dto';
import { UpdateQuizAttemptDto } from './dto/update-quiz-attempts.dto';
import { QuizAttempt } from './entities/quiz-attempts.entity';

@Injectable()
export class QuizAttemptsService extends BaseService<
  QuizAttempt,
  CreateQuizAttemptDto,
  UpdateQuizAttemptDto
> {
  constructor(
    @InjectRepository(QuizAttempt)
    private readonly quizAttemptRepository: Repository<QuizAttempt>,
  ) {
    super(quizAttemptRepository);
  }
}
