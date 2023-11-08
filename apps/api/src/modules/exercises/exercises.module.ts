import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from './entities/exercise.entity';
import { ExercisesGateway } from './exercises.gateway';
import { McqsModule } from '../mcqs/mcqs.module';
import { QuestionsModule } from '../questions/questions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise]), McqsModule, QuestionsModule],
  controllers: [ExercisesController],
  providers: [ExercisesService, ExercisesGateway],
  exports: [ExercisesService],
})
export class ExercisesModule {}
