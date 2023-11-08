import { Module } from '@nestjs/common';
import { UserQuizAnswerService } from './user-quiz-answer.service';
import { UserQuizAnswerController } from './user-quiz-answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserQuizAnswer } from './entities/user-quiz-answer.entity';
import { UserQuizAnswerGateway } from './user-quiz-answer.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([UserQuizAnswer])],
  controllers: [UserQuizAnswerController],
  providers: [UserQuizAnswerService, UserQuizAnswerGateway],
})
export class UserQuizAnswerModule {}
