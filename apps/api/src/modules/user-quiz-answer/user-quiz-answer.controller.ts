import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserQuizAnswerService } from './user-quiz-answer.service';
import { CreateUserQuizAnswerDto } from './dto/create-user-quiz-answer.dto';
import { UpdateUserQuizAnswerDto } from './dto/update-user-quiz-answer.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common';
import { Role } from '../users/enum/role.enum';

@Controller('user-quiz-answers')
@ApiTags('User Quiz Answer')
@ApiBearerAuth('x-api-key')
@ApiBearerAuth()
export class UserQuizAnswerController {
  constructor(private readonly userQuizAnswerService: UserQuizAnswerService) {}

  @Roles(Role.User)
  @Post()
  create(@Body() createUserQuizAnswerDto: CreateUserQuizAnswerDto) {
    return this.userQuizAnswerService.create(createUserQuizAnswerDto);
  }

  @Get()
  findAll() {
    return this.userQuizAnswerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userQuizAnswerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserQuizAnswerDto: UpdateUserQuizAnswerDto) {
    return this.userQuizAnswerService.update(+id, updateUserQuizAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userQuizAnswerService.remove(+id);
  }
}
