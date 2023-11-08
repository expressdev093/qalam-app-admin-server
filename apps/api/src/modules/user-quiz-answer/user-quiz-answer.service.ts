import { Injectable } from '@nestjs/common';
import { CreateUserQuizAnswerDto } from './dto/create-user-quiz-answer.dto';
import { UpdateUserQuizAnswerDto } from './dto/update-user-quiz-answer.dto';
import { BaseService } from 'src/common';
import { UserQuizAnswer } from './entities/user-quiz-answer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserQuizAnswerService extends BaseService<
  UserQuizAnswer,
  CreateUserQuizAnswerDto,
  UpdateUserQuizAnswerDto
> {
  constructor(
    @InjectRepository(UserQuizAnswer)
    private readonly userQuizAnswerRepository: Repository<UserQuizAnswer>,
  ) {
    super(userQuizAnswerRepository);
  }
}
