import { PartialType } from '@nestjs/mapped-types';
import { CreateVideoLikeDto } from './create-video-like.dto';

export class UpdateVideoLikeDto extends PartialType(CreateVideoLikeDto) {}
