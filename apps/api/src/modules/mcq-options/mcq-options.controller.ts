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
import { McqOptionsService } from './mcq-options.service';
import { CreateMcqOptionDto } from './dto/create-mcq-option.dto';
import { UpdateMcqOptionDto } from './dto/update-mcq-option.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Mcq Options')
@ApiBearerAuth('x-api-key')
@ApiBearerAuth()
@Controller('mcq-options')
export class McqOptionsController {
  constructor(private readonly mcqOptionsService: McqOptionsService) {}

  @Post()
  create(@Body() createMcqOptionDto: CreateMcqOptionDto) {
    return this.mcqOptionsService.create(createMcqOptionDto);
  }

  @Get()
  async findAll(@Query() params: any, @Res() res: Response) {
    const { data, count } = await this.mcqOptionsService.findAllByAndCount(params);
    res.setHeader('x-total-count', count.toString()); // Update the header value with the actual count
    res.status(HttpStatus.OK).json(data);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mcqOptionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMcqOptionDto: UpdateMcqOptionDto) {
    return this.mcqOptionsService.update(+id, updateMcqOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mcqOptionsService.remove(+id);
  }
}
