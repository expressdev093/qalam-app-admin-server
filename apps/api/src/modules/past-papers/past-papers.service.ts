import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common';
import { Repository } from 'typeorm';
import { PastPaper } from './entities/past-papers.entity';
import { CreatePastPaperDto } from './dto/create-past-papers.dto';
import { UpdatePastPaperDto } from './dto/update-past-papers.dto';

@Injectable()
export class PastPapersService extends BaseService<
  PastPaper,
  CreatePastPaperDto,
  UpdatePastPaperDto
> {
  constructor(
    @InjectRepository(PastPaper)
    private readonly pastPaperRepository: Repository<PastPaper>,
  ) {
    super(pastPaperRepository);
  }

  findOne(id: number) {
    return this.pastPaperRepository.findOne({
      where: {
        id,
      },
      relations: {
        subject: true,
      },
    });
  }

  async remove(id: number) {
    const paper = await this.findOne(id);
    if (paper.url) {
      await this.utilsService.unlinkAsync(paper.url);
    }
    return this.pastPaperRepository.remove(paper);
  }

  async getDistinctYears() {
    const distinctYears = await this.pastPaperRepository
      .createQueryBuilder('past_papers') // Specify the table alias here
      .select('DISTINCT past_papers.year') // Specify the table alias before the column name
      .orderBy('past_papers.year', 'DESC')
      .getRawMany();
    return distinctYears.map((row) => row.year);
  }
}
