import { Module } from '@nestjs/common';
import { LoginDeviceInfoService } from './login-device-info.service';
import { LoginDeviceInfoController } from './login-device-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginDeviceInfo } from './entities/login-device-info.entity';
import { LoginDeviceInfoGateway } from './login-device-info.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([LoginDeviceInfo])],
  controllers: [LoginDeviceInfoController],
  providers: [LoginDeviceInfoService, LoginDeviceInfoGateway],
  exports: [LoginDeviceInfoService],
})
export class LoginDeviceInfoModule {}
