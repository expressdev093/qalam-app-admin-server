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
import { QuizMcqsService } from './quiz-mcqs.service';
import { CreateQuizMcqDto } from './dto/create-quiz-mcq.dto';
import { UpdateQuizMcqDto } from './dto/update-quiz-mcq.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Quiz Mcqs')
@ApiBearerAuth('x-api-key')
@ApiBearerAuth()
@Controller('quiz-mcqs')
export class QuizMcqsController {
  constructor(private readonly quizMcqsService: QuizMcqsService) {}

  @Post()
  create(@Body() createQuizMcqDto: CreateQuizMcqDto) {
    return this.quizMcqsService.create(createQuizMcqDto);
  }

  @Get()
  async findAll(@Query() params: any, @Res() res: Response) {
    const { data, count } = await this.quizMcqsService.findAllByAndCount(params);
    res.setHeader('x-total-count', count.toString()); // Update the header value with the actual count
    res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizMcqsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizMcqDto: UpdateQuizMcqDto) {
    return this.quizMcqsService.update(+id, updateQuizMcqDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizMcqsService.remove(+id);
  }
}
