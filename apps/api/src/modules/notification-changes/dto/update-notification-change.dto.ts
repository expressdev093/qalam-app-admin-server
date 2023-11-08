import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificationChangeDto } from './create-notification-change.dto';

export class UpdateNotificationChangeDto extends PartialType(CreateNotificationChangeDto) {}
