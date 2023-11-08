import { PartialType } from '@nestjs/mapped-types';
import { CreateOnlineClassDto } from './create-online-class.dto';

export class UpdateOnlineClassDto extends PartialType(CreateOnlineClassDto) {}
