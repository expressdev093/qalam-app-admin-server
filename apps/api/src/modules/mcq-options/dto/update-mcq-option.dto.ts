import { PartialType } from '@nestjs/mapped-types';
import { CreateMcqOptionDto } from './create-mcq-option.dto';

export class UpdateMcqOptionDto extends PartialType(CreateMcqOptionDto) {}
