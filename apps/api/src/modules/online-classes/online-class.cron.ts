import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { OnlineClassesService } from './online-classes.service';

@Injectable()
export class OnlineClassCron {
  private readonly logger = new Logger(OnlineClassCron.name);
  constructor(private readonly onlineClassesService: OnlineClassesService) {}

  @Cron('0 * * * *') // Runs every hour
  async endExpireClasses(): Promise<void> {
    this.logger.debug('Ended Expired Classes');
    await this.onlineClassesService.endExpireClasses();
  }
}
