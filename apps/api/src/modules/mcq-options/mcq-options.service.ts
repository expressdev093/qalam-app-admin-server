import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common';
import { Repository } from 'typeorm';
import { CreateMcqOptionDto } from './dto/create-mcq-option.dto';
import { UpdateMcqOptionDto } from './dto/update-mcq-option.dto';
import { McqOption } from './entities/mcq-option.entity';

@Injectable()
export class McqOptionsService extends BaseService<
  McqOption,
  CreateMcqOptionDto,
  UpdateMcqOptionDto
> {
  constructor(
    @InjectRepository(McqOption)
    private readonly mcqOptionRepository: Repository<McqOption>,
  ) {
    super(mcqOptionRepository);
  }

  async saveAll(options: CreateMcqOptionDto[]) {
    const bulkOptions = options.map((op) => this.mcqOptionRepository.create(op));
    return this.mcqOptionRepository.save(bulkOptions);
  }
}
