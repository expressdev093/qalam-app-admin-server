import { PartialType } from '@nestjs/mapped-types';
import { CreateAppCornerDto } from './create-app-corner.dto';

export class UpdateAppCornerDto extends PartialType(CreateAppCornerDto) {}
