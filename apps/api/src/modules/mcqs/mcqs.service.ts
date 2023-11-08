import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UtilsService } from '../utils/utils.service';
import { CreateMcqDto } from './dto/create-mcq.dto';
import { UpdateMcqDto } from './dto/update-mcq.dto';
import { Mcq } from './entities/mcq.entity';
import { CreateMcqOptionDto } from '../mcq-options/dto/create-mcq-option.dto';
import { McqOptionsService } from '../mcq-options/mcq-options.service';

interface IType {
  exerciseId: number;
  text: string;
  options: CreateMcqOptionDto[];
}
@Injectable()
export class McqsService extends BaseService<Mcq, CreateMcqDto, UpdateMcqDto> {
  constructor(
    @InjectRepository(Mcq) private readonly mcqRepository: Repository<Mcq>,
    private readonly mcqOptionsService: McqOptionsService,
  ) {
    super(mcqRepository);
  }

  async saveAll(createMcqs: IType[]) {
    const bulkMcqs = createMcqs.map((mcqs) =>
      this.mcqRepository.create({ text: mcqs.text, exerciseId: mcqs.exerciseId }),
    );
    const mcqs = await this.mcqRepository.save(bulkMcqs);

    const options: CreateMcqOptionDto[] = mcqs
      .map(({ id }, index) => {
        return createMcqs[index].options.map((op) => ({ ...op, mcqId: id }));
      })
      .flat();

    await this.mcqOptionsService.saveAll(options);
    return mcqs;
  }
}
