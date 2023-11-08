import { Module } from '@nestjs/common';
import { NotificationChangesService } from './notification-changes.service';
import { NotificationChangesController } from './notification-changes.controller';

@Module({
  controllers: [NotificationChangesController],
  providers: [NotificationChangesService],
})
export class NotificationChangesModule {}
