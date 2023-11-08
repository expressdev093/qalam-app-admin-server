import { Module } from '@nestjs/common';
import { QuizMcqoptionsService } from './quiz-mcqoptions.service';
import { QuizMcqoptionsController } from './quiz-mcqoptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizMcqoption } from './entities/quiz-mcqoption.entity';
import { QuizMcqOptionsGateway } from './quiz-mcqoptions.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([QuizMcqoption])],
  controllers: [QuizMcqoptionsController],
  providers: [QuizMcqoptionsService, QuizMcqOptionsGateway],
  exports: [QuizMcqoptionsService],
})
export class QuizMcqoptionsModule {}
