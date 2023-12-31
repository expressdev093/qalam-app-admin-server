import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuizResultsService } from './quiz-results.service';
import { CreateQuizResultDto } from './dto/create-quiz-result.dto';
import { UpdateQuizResultDto } from './dto/update-quiz-result.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Quiz Results')
@Controller('quiz-results')
export class QuizResultsController {
  constructor(private readonly quizResultsService: QuizResultsService) {}

  @Post()
  create(@Body() createQuizResultDto: CreateQuizResultDto) {
    return this.quizResultsService.create(createQuizResultDto);
  }

  @Get()
  findAll() {
    return this.quizResultsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizResultsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizResultDto: UpdateQuizResultDto) {
    return this.quizResultsService.update(+id, updateQuizResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizResultsService.remove(+id);
  }
}
