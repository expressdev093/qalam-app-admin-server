import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common';
import { LessThan, MoreThanOrEqual, Repository } from 'typeorm';
import { UtilsService } from '../utils/utils.service';
import { CreateOnlineClassDto } from './dto/create-online-class.dto';
import { UpdateOnlineClassDto } from './dto/update-online-class.dto';
import { OnlineClass } from './entities/online-class.entity';

@Injectable()
export class OnlineClassesService extends BaseService<
  OnlineClass,
  CreateOnlineClassDto,
  UpdateOnlineClassDto
> {
  constructor(
    @InjectRepository(OnlineClass)
    private readonly onlineClassRepository: Repository<OnlineClass>,
  ) {
    super(onlineClassRepository);
  }

  async endExpireClasses(): Promise<void> {
    const currentDate = new Date();

    const expiredClasses = await this.onlineClassRepository.find({
      where: {
        endDate: LessThan(currentDate),
      },
    });

    for (const expiredClass of expiredClasses) {
      expiredClass.isEnded = true;
      await this.onlineClassRepository.save(expiredClass);
    }
  }

  async findNearestClass(): Promise<any> {
    console.log('find nearst class');
    const now = new Date();
    const onlineClass = await this.onlineClassRepository
      .createQueryBuilder('online_classses')
      .where('online_classses.start_date <= :currentDate', {
        currentDate: new Date(), // Assuming current date is used to filter classes
      })
      .andWhere('online_classses.is_ended = :isEnded', { isEnded: false })
      .andWhere('online_classses.is_active = :isActive', { isActive: true })
      .orderBy('online_classses.start_date', 'ASC')
      .getOne();

    if (onlineClass) {
      return this.onlineClassRepository.findOne({
        where: {
          id: onlineClass.id,
        },
        relations: ['subject', 'chapter', 'topic', 'topic.videos'],
      });
    }
    return undefined;
  }
}
