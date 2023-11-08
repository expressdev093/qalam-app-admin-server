import { PartialType } from '@nestjs/swagger';
import { CreateUserQuizAnswerDto } from './create-user-quiz-answer.dto';

export class UpdateUserQuizAnswerDto extends PartialType(CreateUserQuizAnswerDto) {}
