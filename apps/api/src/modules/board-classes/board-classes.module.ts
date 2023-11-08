import { Module } from '@nestjs/common';
import { BoardClassesService } from './board-classes.service';
import { BoardClassesController } from './board-classes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardClass } from './entities/board-class.entity';
import { BoardClassesGateway } from './board-classes.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([BoardClass])],
  controllers: [BoardClassesController],
  providers: [BoardClassesService, BoardClassesGateway],
  exports: [BoardClassesService],
})
export class BoardClassesModule {}
