import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizMcqoptionDto } from './create-quiz-mcqoption.dto';

export class UpdateQuizMcqoptionDto extends PartialType(CreateQuizMcqoptionDto) {}
