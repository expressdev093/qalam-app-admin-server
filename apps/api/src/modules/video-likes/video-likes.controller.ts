import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { VideoLikesService } from './video-likes.service';
import { CreateVideoLikeDto } from './dto/create-video-like.dto';
import { UpdateVideoLikeDto } from './dto/update-video-like.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiBearerAuth('x-api-key')
@ApiBearerAuth()
@ApiTags('Video Likes')
@Controller('video-likes')
export class VideoLikesController {
  constructor(private readonly videoLikesService: VideoLikesService) {}

  @Get('is-liked')
  async isVideoLiked(@Query() params: any) {
    const count = await this.videoLikesService.countBy(params);
    return count !== 0;
  }

  @Patch('unlike')
  unlike(@Body() updateVideoLikeDto: UpdateVideoLikeDto) {
    return this.videoLikesService.unlike(updateVideoLikeDto);
  }

  @Post('like')
  like(@Body() createVideoLikeDto: CreateVideoLikeDto) {
    return this.videoLikesService.like(createVideoLikeDto);
  }

  @Post()
  create(@Body() createVideoLikeDto: CreateVideoLikeDto) {
    return this.videoLikesService.create(createVideoLikeDto);
  }

  @Get()
  async findAll(@Query() params: any, @Res() res: Response) {
    const { data, count } = await this.videoLikesService.findAllByAndCount(params);
    res.setHeader('x-total-count', count.toString()); // Update the header value with the actual count
    res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoLikesService.findOneBy({ id: +id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoLikeDto: UpdateVideoLikeDto) {
    return this.videoLikesService.update(+id, updateVideoLikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoLikesService.remove(+id);
  }

  @Get('/counts/:videoId')
  counts(@Param('videoId') videoId: number) {
    return this.videoLikesService.count({
      videoId: +videoId,
    });
  }
}
