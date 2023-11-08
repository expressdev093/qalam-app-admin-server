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
import { OnlineClassesService } from './online-classes.service';
import { CreateOnlineClassDto } from './dto/create-online-class.dto';
import { UpdateOnlineClassDto } from './dto/update-online-class.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiBearerAuth('x-api-key')
@ApiBearerAuth()
@ApiTags('Online Classes')
@Controller('online-classes')
export class OnlineClassesController {
  constructor(private readonly onlineClassesService: OnlineClassesService) {}

  @Get('nearest-class')
  async findNearestClass() {
    return this.onlineClassesService.findNearestClass();
  }

  @Post()
  create(@Body() createOnlineClassDto: CreateOnlineClassDto) {
    return this.onlineClassesService.create(createOnlineClassDto);
  }

  @Get()
  async findAll(@Query() params: any, @Res() res: Response) {
    const { data, count } = await this.onlineClassesService.findAllByAndCount(params);
    res.setHeader('x-total-count', count.toString()); // Update the header value with the actual count
    res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.onlineClassesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOnlineClassDto: UpdateOnlineClassDto) {
    return this.onlineClassesService.update(+id, updateOnlineClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.onlineClassesService.remove(+id);
  }
}
