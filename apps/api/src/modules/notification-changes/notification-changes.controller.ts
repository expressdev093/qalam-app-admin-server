import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationChangesService } from './notification-changes.service';
import { CreateNotificationChangeDto } from './dto/create-notification-change.dto';
import { UpdateNotificationChangeDto } from './dto/update-notification-change.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Notification Changes')
@Controller('notification-changes')
export class NotificationChangesController {
  constructor(private readonly notificationChangesService: NotificationChangesService) {}

  @Post()
  create(@Body() createNotificationChangeDto: CreateNotificationChangeDto) {
    return this.notificationChangesService.create(createNotificationChangeDto);
  }

  @Get()
  findAll() {
    return this.notificationChangesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationChangesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotificationChangeDto: UpdateNotificationChangeDto,
  ) {
    return this.notificationChangesService.update(+id, updateNotificationChangeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationChangesService.remove(+id);
  }
}
