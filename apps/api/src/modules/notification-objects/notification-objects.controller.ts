import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationObjectsService } from './notification-objects.service';
import { CreateNotificationObjectDto } from './dto/create-notification-object.dto';
import { UpdateNotificationObjectDto } from './dto/update-notification-object.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Notification Objects')
@Controller('notification-objects')
export class NotificationObjectsController {
  constructor(private readonly notificationObjectsService: NotificationObjectsService) {}

  @Post()
  create(@Body() createNotificationObjectDto: CreateNotificationObjectDto) {
    return this.notificationObjectsService.create(createNotificationObjectDto);
  }

  @Get()
  findAll() {
    return this.notificationObjectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationObjectsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotificationObjectDto: UpdateNotificationObjectDto,
  ) {
    return this.notificationObjectsService.update(+id, updateNotificationObjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationObjectsService.remove(+id);
  }
}
