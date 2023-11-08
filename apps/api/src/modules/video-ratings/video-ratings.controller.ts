import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VideoRatingsService } from './video-ratings.service';
import { CreateVideoRatingDto } from './dto/create-video-rating.dto';
import { UpdateVideoRatingDto } from './dto/update-video-rating.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('x-api-key')
@ApiBearerAuth()
@ApiTags('Video Ratings')
@Controller('video-ratings')
export class VideoRatingsController {
  constructor(private readonly videoRatingsService: VideoRatingsService) {}

  @Post()
  create(@Body() createVideoRatingDto: CreateVideoRatingDto) {
    return this.videoRatingsService.create(createVideoRatingDto);
  }

  @Get('/rating/:videoId')
  getVideoRatingsByVideoId(@Query('videoId') vidoeId: number) {
    return this.videoRatingsService.getRatingByVideoId(vidoeId);
  }

  @Get()
  findAll(@Query() params: any) {
    return this.videoRatingsService.findAllBy(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoRatingsService.findAllBy(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoRatingDto: UpdateVideoRatingDto) {
    return this.videoRatingsService.update(+id, updateVideoRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoRatingsService.remove(+id);
  }
}
