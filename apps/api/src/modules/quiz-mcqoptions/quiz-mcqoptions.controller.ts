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
import { QuizMcqoptionsService } from './quiz-mcqoptions.service';
import { CreateQuizMcqoptionDto } from './dto/create-quiz-mcqoption.dto';
import { UpdateQuizMcqoptionDto } from './dto/update-quiz-mcqoption.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Quiz Mcq Options')
@ApiBearerAuth('x-api-key')
@ApiBearerAuth()
@Controller('quiz-mcqoptions')
export class QuizMcqoptionsController {
  constructor(private readonly quizMcqoptionsService: QuizMcqoptionsService) {}

  @Post()
  create(@Body() createQuizMcqoptionDto: CreateQuizMcqoptionDto) {
    return this.quizMcqoptionsService.create(createQuizMcqoptionDto);
  }

  @Get()
  async findAll(@Query() params: any, @Res() res: Response) {
    const { data, count } = await this.quizMcqoptionsService.findAllByAndCount(params);
    res.setHeader('x-total-count', count.toString()); // Update the header value with the actual count
    res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizMcqoptionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizMcqoptionDto: UpdateQuizMcqoptionDto) {
    return this.quizMcqoptionsService.update(+id, updateQuizMcqoptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizMcqoptionsService.remove(+id);
  }
}
