import { Module } from '@nestjs/common';
import { AppCornersService } from './app-corners.service';
import { AppCornersController } from './app-corners.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppCorner } from './entities/app-corner.entity';
import { AppCornersGateway } from './app-corners.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([AppCorner])],
  controllers: [AppCornersController],
  providers: [AppCornersService, AppCornersGateway],
  exports: [AppCornersService],
})
export class AppCornersModule {}
