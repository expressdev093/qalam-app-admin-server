import { Module } from '@nestjs/common';
import { UserQuizService } from './user-quiz.service';
import { UserQuizController } from './user-quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserQuiz } from './entities/user-quiz.entity';
import { UserQuizGateway } from './user-quiz.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([UserQuiz])],
  controllers: [UserQuizController],
  providers: [UserQuizService, UserQuizGateway],
  exports: [UserQuizService],
})
export class UserQuizModule {}
