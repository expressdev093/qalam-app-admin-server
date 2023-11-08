import { Injectable } from '@nestjs/common';
import { CreateNotificationChangeDto } from './dto/create-notification-change.dto';
import { UpdateNotificationChangeDto } from './dto/update-notification-change.dto';

@Injectable()
export class NotificationChangesService {
  create(createNotificationChangeDto: CreateNotificationChangeDto) {
    return 'This action adds a new notificationChange';
  }

  findAll() {
    return `This action returns all notificationChanges`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notificationChange`;
  }

  update(id: number, updateNotificationChangeDto: UpdateNotificationChangeDto) {
    return `This action updates a #${id} notificationChange`;
  }

  remove(id: number) {
    return `This action removes a #${id} notificationChange`;
  }
}
