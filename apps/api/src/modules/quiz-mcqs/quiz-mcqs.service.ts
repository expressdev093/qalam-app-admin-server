import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common';
import { Repository } from 'typeorm';
import { UtilsService } from '../utils/utils.service';
import { CreateQuizMcqDto } from './dto/create-quiz-mcq.dto';
import { UpdateQuizMcqDto } from './dto/update-quiz-mcq.dto';
import { QuizMcq } from './entities/quiz-mcq.entity';
import { CreateQuizMcqoptionDto } from '../quiz-mcqoptions/dto/create-quiz-mcqoption.dto';
import { QuizMcqoptionsService } from '../quiz-mcqoptions/quiz-mcqoptions.service';

interface IType {
  quizId: number;
  text: string;
  options: CreateQuizMcqoptionDto[];
}
@Injectable()
export class QuizMcqsService extends BaseService<QuizMcq, CreateQuizMcqDto, UpdateQuizMcqDto> {
  constructor(
    @InjectRepository(QuizMcq) private readonly quizMcqRepository: Repository<QuizMcq>,
    private readonly quizMcqoptionsService: QuizMcqoptionsService,
  ) {
    super(quizMcqRepository);
  }

  async saveAll(quizMcqs: IType[]) {
    const bulkMcqs = quizMcqs.map((mcqs) =>
      this.quizMcqRepository.create({ text: mcqs.text, quizId: mcqs.quizId }),
    );
    const mcqs = await this.quizMcqRepository.save(bulkMcqs);

    const options: CreateQuizMcqoptionDto[] = mcqs
      .map(({ id }, index) => {
        return quizMcqs[index].options.map((op) => ({ ...op, quizMcqId: id }));
      })
      .flat();

    await this.quizMcqoptionsService.saveAll(options);
    return mcqs;
  }
}
