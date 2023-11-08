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
import { McqsService } from './mcqs.service';
import { CreateMcqDto } from './dto/create-mcq.dto';
import { UpdateMcqDto } from './dto/update-mcq.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Mcqs')
@ApiBearerAuth('x-api-key')
@ApiBearerAuth()
@Controller('mcqs')
export class McqsController {
  constructor(private readonly mcqsService: McqsService) {}

  @Post()
  create(@Body() createMcqDto: CreateMcqDto) {
    return this.mcqsService.create(createMcqDto);
  }

  @Get()
  async findAll(@Query() params: any, @Res() res: Response) {
    const { data, count } = await this.mcqsService.findAllByAndCount(params);
    res.setHeader('x-total-count', count.toString()); // Update the header value with the actual count
    res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mcqsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMcqDto: UpdateMcqDto) {
    return this.mcqsService.update(+id, updateMcqDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mcqsService.remove(+id);
  }
}
