import { Module } from '@nestjs/common';
import { McqOptionsService } from './mcq-options.service';
import { McqOptionsController } from './mcq-options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { McqOption } from './entities/mcq-option.entity';
import { McqOptionsGateway } from './mcq-options.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([McqOption])],
  controllers: [McqOptionsController],
  providers: [McqOptionsService, McqOptionsGateway],
  exports: [McqOptionsService],
})
export class McqOptionsModule {}
