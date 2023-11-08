import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './entities/topic.entity';

import { TopicVideo } from '../topic-videos/entities/topic-video.entity';
import { UtilsService } from '../utils/utils.service';
import { BaseService } from 'src/common';
import { TopicVideosView } from './entities/topic-video.view';

@Injectable()
export class TopicsService extends BaseService<Topic, CreateTopicDto, UpdateTopicDto> {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
    @InjectRepository(TopicVideosView)
    private readonly topicVideoViewRepository: Repository<TopicVideosView>,
  ) {
    super(topicRepository);
  }

  async findAllWithVideos(params: any) {
    const { _end, _start, _order, _sort, ...rest } = params;
    const options = await this.utilsService.parseParams<TopicVideosView>(params);
    if (JSON.stringify(options.where) === '{}') {
      delete options.where;
    }

    if (JSON.stringify(options.order) === '{}') {
      delete options.order;
    }

    const data = await this.topicVideoViewRepository.find({
      ...options,
      
    });

    return data;
  }

  findOne(id: number) {
    return this.topicRepository.findOne({
      where: {
        id,
      },
      relations: ['chapter', 'chapter.subject'],
    });
  }

  async remove(id: number) {
    const topic = await this.findOneBy({ id });
    if (topic.image) {
      await this.utilsService.unlinkAsync(topic.image);
    }
    return this.topicRepository.remove(topic);
  }
}
