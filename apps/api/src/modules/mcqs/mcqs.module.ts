import { Module } from '@nestjs/common';
import { McqsService } from './mcqs.service';
import { McqsController } from './mcqs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mcq } from './entities/mcq.entity';
import { McqsGateway } from './mcqs.gateway';
import { McqOptionsModule } from '../mcq-options/mcq-options.module';

@Module({
  imports: [TypeOrmModule.forFeature([Mcq]), McqOptionsModule],
  controllers: [McqsController],
  providers: [McqsService, McqsGateway],
  exports: [McqsService],
})
export class McqsModule {}
