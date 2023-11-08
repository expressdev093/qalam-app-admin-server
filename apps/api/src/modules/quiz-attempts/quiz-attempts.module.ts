import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizAttempt } from './entities/quiz-attempts.entity';
import { QuizAttemptsController } from './quiz-attempts.controller';
import { QuizAttemptsGateway } from './quiz-attempts.gateway';
import { QuizAttemptsService } from './quiz-attempts.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuizAttempt])],
  controllers: [QuizAttemptsController],
  providers: [QuizAttemptsService, QuizAttemptsGateway],
})
export class QuizAttemptsModule {}
