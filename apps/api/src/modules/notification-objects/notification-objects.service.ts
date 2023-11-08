import { Injectable } from '@nestjs/common';
import { CreateNotificationObjectDto } from './dto/create-notification-object.dto';
import { UpdateNotificationObjectDto } from './dto/update-notification-object.dto';

@Injectable()
export class NotificationObjectsService {
  create(createNotificationObjectDto: CreateNotificationObjectDto) {
    return 'This action adds a new notificationObject';
  }

  findAll() {
    return `This action returns all notificationObjects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notificationObject`;
  }

  update(id: number, updateNotificationObjectDto: UpdateNotificationObjectDto) {
    return `This action updates a #${id} notificationObject`;
  }

  remove(id: number) {
    return `This action removes a #${id} notificationObject`;
  }
}
