import { PartialType } from '@nestjs/mapped-types';
import { CreateTopicVideoDto } from './create-topic-video.dto';

export class UpdateTopicVideoDto extends PartialType(CreateTopicVideoDto) {}
