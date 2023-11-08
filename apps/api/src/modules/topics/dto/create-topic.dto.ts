import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  chapterId: number;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  subjectId: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  // @IsOptional()
  // @ValidateNested({ each: true })
  // @Type(() => CreateTopicVideoDto)
  // topicVideos?: CreateTopicVideoDto[];
}
