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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateQuizAttemptDto } from './dto/create-quiz-attempts.dto';
import { UpdateQuizAttemptDto } from './dto/update-quiz-attempts.dto';
import { QuizAttemptsService } from './quiz-attempts.service';
import { Response } from 'express';

@ApiBearerAuth('x-api-key')
@ApiBearerAuth()
@ApiTags('Quiz Attempts')
@Controller('quiz-attempts')
export class QuizAttemptsController {
  constructor(private readonly quizAttemptsService: QuizAttemptsService) {}

  @Post()
  create(@Body() createQuizResultDto: CreateQuizAttemptDto) {
    return this.quizAttemptsService.create(createQuizResultDto);
  }

  @Get()
  async findAll(@Query() params: any, @Res() res: Response) {
    const { data, count } = await this.quizAttemptsService.findAllByAndCount(params);
    res.setHeader('x-total-count', count.toString()); // Update the header value with the actual count
    res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizAttemptsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizResultDto: UpdateQuizAttemptDto) {
    return this.quizAttemptsService.update(+id, updateQuizResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizAttemptsService.remove(+id);
  }
}
