import { Injectable } from '@nestjs/common';
import { CreateUserQuizDto } from './dto/create-user-quiz.dto';
import { UpdateUserQuizDto } from './dto/update-user-quiz.dto';
import { BaseService } from 'src/common';
import { UserQuiz } from './entities/user-quiz.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserQuizService extends BaseService<UserQuiz , CreateUserQuizDto, UpdateUserQuizDto> {

  constructor(
    @InjectRepository(UserQuiz)
    private readonly userQuizRepository : Repository<UserQuiz>
  ){
    super(userQuizRepository)
  }
  
}
