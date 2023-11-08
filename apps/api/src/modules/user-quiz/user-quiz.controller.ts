import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { UserQuizService } from './user-quiz.service';
import { CreateUserQuizDto } from './dto/create-user-quiz.dto';
import { UpdateUserQuizDto } from './dto/update-user-quiz.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common';
import { Role } from '../users/enum/role.enum';
import { UserQuiz } from './entities/user-quiz.entity';
import { Response } from 'express';

@ApiTags('User Quizzes')
@Controller('user-quizzes')
@ApiBearerAuth('x-api-key')
@ApiBearerAuth()
export class UserQuizController {
  constructor(private readonly userQuizService: UserQuizService) {}

  @ApiOperation({ summary: 'Create new user quiz' })
  @ApiResponse({ status: 403, description: 'Forbidden.', type: UserQuiz })
  @Roles(Role.User)
  @Post()
  create(@Body() createUserQuizDto: CreateUserQuizDto) {
    return this.userQuizService.create(createUserQuizDto);
  }

  @Get()
  async findAll(@Query() params: any, @Res() res: Response) {
    const { data, count } = await this.userQuizService.findAllByAndCount(params);
    res.setHeader('x-total-count', count.toString()); // Update the header value with the actual count
    res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() params: any) {
    return this.userQuizService.findOneByParams(+id, params);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserQuizDto: UpdateUserQuizDto) {
    return this.userQuizService.update(+id, updateUserQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userQuizService.remove(+id);
  }
}
