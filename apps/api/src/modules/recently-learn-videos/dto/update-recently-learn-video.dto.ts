import { PartialType } from '@nestjs/swagger';
import { CreateRecentlyLearnVideoDto } from './create-recently-learn-video.dto';

export class UpdateRecentlyLearnVideoDto extends PartialType(CreateRecentlyLearnVideoDto) {}
