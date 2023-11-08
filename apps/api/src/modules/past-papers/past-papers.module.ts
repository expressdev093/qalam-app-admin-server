import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PastPaper } from './entities/past-papers.entity';
import { PastPapersController } from './past-papers.controller';
import { PastPapersService } from './past-papers.service';
import { PastPapersGateway } from './past-papers.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([PastPaper])],
  controllers: [PastPapersController],
  providers: [PastPapersService, PastPapersGateway],
})
export class PastPapersModule {}
