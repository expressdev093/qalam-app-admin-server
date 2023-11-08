import { Injectable } from '@nestjs/common';
import { CreateLoginDeviceInfoDto } from './dto/create-login-device-info.dto';
import { UpdateLoginDeviceInfoDto } from './dto/update-login-device-info.dto';
import { BaseService } from 'src/common';
import { LoginDeviceInfo } from './entities/login-device-info.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LoginDeviceInfoService extends BaseService<
  LoginDeviceInfo,
  CreateLoginDeviceInfoDto,
  UpdateLoginDeviceInfoDto
> {
  constructor(
    @InjectRepository(LoginDeviceInfo)
    private readonly loginDeviceInfoRepository: Repository<LoginDeviceInfo>,
  ) {
    super(loginDeviceInfoRepository);
  }

  async createOrUpdate(createLoginDeviceInfoDto: CreateLoginDeviceInfoDto) {
    const deviceInfo = await this.findOneBy({
      deviceId: createLoginDeviceInfoDto.deviceId,
    });

    if (deviceInfo) {
      return this.update(deviceInfo.id, {
        ...deviceInfo,
        ...createLoginDeviceInfoDto,
      });
    }

    return this.create(createLoginDeviceInfoDto);
  }

  async removeBy(deviceId: string) {
    const deviceInfo = await this.findOneBy({ deviceId });
    return this.loginDeviceInfoRepository.remove(deviceInfo);
  }
}
