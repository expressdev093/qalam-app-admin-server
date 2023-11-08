import { PartialType } from '@nestjs/mapped-types';
import { CreateVideoRatingDto } from './create-video-rating.dto';

export class UpdateVideoRatingDto extends PartialType(CreateVideoRatingDto) {}
