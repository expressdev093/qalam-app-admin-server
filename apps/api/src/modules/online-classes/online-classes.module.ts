import { Module } from '@nestjs/common';
import { OnlineClassesService } from './online-classes.service';
import { OnlineClassesController } from './online-classes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OnlineClass } from './entities/online-class.entity';
import { OnlineClassesGateway } from './online-classes.gateway';
import { OnlineClassCron } from './online-class.cron';
import { OnlineClassView } from './entities/online-class.view';

@Module({
  imports: [TypeOrmModule.forFeature([OnlineClass, OnlineClassView])],
  controllers: [OnlineClassesController],
  providers: [OnlineClassesService, OnlineClassesGateway, OnlineClassCron],
  exports: [OnlineClassesService],
})
export class OnlineClassesModule {}
