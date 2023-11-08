import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizMcqDto } from './create-quiz-mcq.dto';

export class UpdateQuizMcqDto extends PartialType(CreateQuizMcqDto) {}
