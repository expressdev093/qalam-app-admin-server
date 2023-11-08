import { Module } from '@nestjs/common';
import { QuizResultsService } from './quiz-results.service';
import { QuizResultsController } from './quiz-results.controller';

@Module({
  controllers: [QuizResultsController],
  providers: [QuizResultsService],
})
export class QuizResultsModule {}
