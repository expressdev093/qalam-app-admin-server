import { Module } from '@nestjs/common';
import { NotificationObjectsService } from './notification-objects.service';
import { NotificationObjectsController } from './notification-objects.controller';

@Module({
  controllers: [NotificationObjectsController],
  providers: [NotificationObjectsService],
})
export class NotificationObjectsModule {}
