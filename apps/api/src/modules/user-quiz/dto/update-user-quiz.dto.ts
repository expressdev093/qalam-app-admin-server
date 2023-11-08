import { PartialType } from '@nestjs/swagger';
import { CreateUserQuizDto } from './create-user-quiz.dto';

export class UpdateUserQuizDto extends PartialType(CreateUserQuizDto) {}
