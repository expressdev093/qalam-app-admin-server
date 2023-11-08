import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizAttemptDto } from './create-quiz-attempts.dto';

export class UpdateQuizAttemptDto extends PartialType(CreateQuizAttemptDto) {}
