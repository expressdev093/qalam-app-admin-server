import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common';
import { Repository } from 'typeorm';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';
import { McqsService } from '../mcqs/mcqs.service';
import { QuestionsService } from '../questions/questions.service';

@Injectable()
export class ExercisesService extends BaseService<Exercise, CreateExerciseDto, UpdateExerciseDto> {
  constructor(
    @InjectRepository(Exercise) private readonly exerciseRepository: Repository<Exercise>,
    private readonly mcqsService: McqsService,
    private readonly questionsService: QuestionsService,
  ) {
    super(exerciseRepository);
  }

  async create({ mcqsUrl, questionsUrl, ...createDto }: CreateExerciseDto): Promise<Exercise> {
    const createNew = this.exerciseRepository.create(createDto);
    const exercise = await this.exerciseRepository.save(createNew);

    if (mcqsUrl) {
      const mcqs = (await this.utilsService.readXlsxFile(mcqsUrl)).map((mcq) => ({
        ...mcq,
        exerciseId: exercise.id,
      }));
      await this.mcqsService.saveAll(mcqs);
      this.utilsService.unlinkAsync(mcqsUrl);
    }

    if (questionsUrl) {
      const questions = await this.utilsService.readXlsxQuestionFile(questionsUrl, exercise.id);
      await this.questionsService.saveAll(questions);
      this.utilsService.unlinkAsync(questionsUrl);
    }

    return exercise;
  }
}
