import { Module } from '@nestjs/common';
import { QuizMcqsService } from './quiz-mcqs.service';
import { QuizMcqsController } from './quiz-mcqs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizMcq } from './entities/quiz-mcq.entity';
import { QuizMcqsGateway } from './quiz-mcqs.gateway';
import { QuizMcqoptionsModule } from '../quiz-mcqoptions/quiz-mcqoptions.module';

@Module({
  imports: [TypeOrmModule.forFeature([QuizMcq]), QuizMcqoptionsModule],
  controllers: [QuizMcqsController],
  providers: [QuizMcqsService, QuizMcqsGateway],
  exports: [QuizMcqsService],
})
export class QuizMcqsModule {}
