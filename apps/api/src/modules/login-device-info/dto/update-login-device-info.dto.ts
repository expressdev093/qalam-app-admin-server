import { PartialType } from '@nestjs/swagger';
import { CreateLoginDeviceInfoDto } from './create-login-device-info.dto';

export class UpdateLoginDeviceInfoDto extends PartialType(CreateLoginDeviceInfoDto) {}
