import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { QuizesController } from './quizes.controller';
import { QuizesService } from './quizes.service';
import { QuizsGateway } from './quzies.gateway';
import { QuizMcqsModule } from '../quiz-mcqs/quiz-mcqs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz]), QuizMcqsModule],
  controllers: [QuizesController],
  providers: [QuizesService, QuizsGateway],
})
export class QuizesModule {}
