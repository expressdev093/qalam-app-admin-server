import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { LoginDeviceInfoService } from './login-device-info.service';
import { CreateLoginDeviceInfoDto } from './dto/create-login-device-info.dto';
import { UpdateLoginDeviceInfoDto } from './dto/update-login-device-info.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('login-device-info')
@ApiTags('Login Device Info')
@ApiBearerAuth('x-api-key')
@ApiBearerAuth()
export class LoginDeviceInfoController {
  constructor(private readonly loginDeviceInfoService: LoginDeviceInfoService) {}

  @Post()
  create(@Body() createLoginDeviceInfoDto: CreateLoginDeviceInfoDto) {
    return this.loginDeviceInfoService.createOrUpdate(createLoginDeviceInfoDto);
  }

  @Get()
  async findAll(@Query() params: any, @Res() res: Response) {
    const { data, count } = await this.loginDeviceInfoService.findAllByAndCount(params);
    res.setHeader('x-total-count', count.toString()); // Update the header value with the actual count
    res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loginDeviceInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoginDeviceInfoDto: UpdateLoginDeviceInfoDto) {
    return this.loginDeviceInfoService.update(+id, updateLoginDeviceInfoDto);
  }

  @Delete(':deviceId')
  remove(@Param('deviceId') deviceId: string) {
    return this.loginDeviceInfoService.removeBy(deviceId);
  }
}
