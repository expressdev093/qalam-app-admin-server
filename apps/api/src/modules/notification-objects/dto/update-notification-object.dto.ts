import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificationObjectDto } from './create-notification-object.dto';

export class UpdateNotificationObjectDto extends PartialType(CreateNotificationObjectDto) {}
