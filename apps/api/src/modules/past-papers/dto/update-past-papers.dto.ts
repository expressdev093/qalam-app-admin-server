import { PartialType } from '@nestjs/mapped-types';
import { CreatePastPaperDto } from './create-past-papers.dto';

export class UpdatePastPaperDto extends PartialType(CreatePastPaperDto) {}
