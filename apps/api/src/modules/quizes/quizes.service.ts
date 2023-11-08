import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common';
import { Repository } from 'typeorm';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './entities/quiz.entity';

import { QuizMcqsService } from '../quiz-mcqs/quiz-mcqs.service';

@Injectable()
export class QuizesService extends BaseService<Quiz, CreateQuizDto, UpdateQuizDto> {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    private readonly quizMcqService: QuizMcqsService,
  ) {
    super(quizRepository);
  }

  async create({ url, ...createDto }: CreateQuizDto): Promise<Quiz> {
    const createNew = this.quizRepository.create(createDto);
    const quiz = await this.quizRepository.save(createNew);

    const quizMcqs = (await this.utilsService.readXlsxFile(url)).map((mcq) => ({
      ...mcq,
      quizId: quiz.id,
    }));

    await this.quizMcqService.saveAll(quizMcqs);

    this.utilsService.unlinkAsync(url);

    return quiz;
  }

  // async findAllByAndCount(params: any): Promise<any> {
  //   const { _end, _start, _order, _sort, ...rest } = params;
  //   const options = await this.utilsService.parseParams<Quiz>(params);
  //   if (JSON.stringify(options.where) === '{}') {
  //     delete options.where;
  //   }

  //   if (JSON.stringify(options.order) === '{}') {
  //     delete options.order;
  //   }

  //   const data = await this.quizRepository.findAndCount({
  //     ...options,
  //   });

  //   const parseData = JSON.parse(JSON.stringify(data[0]));

  //   const quizesWithMcqs = await Promise.all(
  //     parseData.map(async (quiz) => {
  //       const mcqs = await this.quizMcqService.findAllBy({ quizId: quiz.id, relations: 'options' });
  //       return {
  //         ...quiz,
  //         mcqs: mcqs,
  //       };
  //     }),
  //   );
  //   return {
  //     data: quizesWithMcqs,
  //     count: data[1],
  //   };
  // }
}
