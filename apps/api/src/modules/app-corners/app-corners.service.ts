import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common';
import { Repository } from 'typeorm';
import { UtilsService } from '../utils/utils.service';
import { CreateAppCornerDto } from './dto/create-app-corner.dto';
import { UpdateAppCornerDto } from './dto/update-app-corner.dto';
import { AppCorner } from './entities/app-corner.entity';

@Injectable()
export class AppCornersService extends BaseService<
  AppCorner,
  CreateAppCornerDto,
  UpdateAppCornerDto
> {
  constructor(
    @InjectRepository(AppCorner)
    private readonly appCornerRepository: Repository<AppCorner>,
  ) {
    super(appCornerRepository);
  }

  async remove(id: number) {
    const appCorner = await this.findOneBy({ id });
    const { image, video, videoThumbnail } = appCorner;
    await this.utilsService.unlinkAsync(image);
    await this.utilsService.unlinkAsync(video);
    await this.utilsService.unlinkAsync(videoThumbnail);

    return this.appCornerRepository.remove(appCorner);
  }
}
