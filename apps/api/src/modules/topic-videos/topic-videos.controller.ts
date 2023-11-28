import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Put,
  UploadedFile,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { TopicVideosService } from './topic-videos.service';
import { CreateTopicVideoDto } from './dto/create-topic-video.dto';
import { UpdateTopicVideoDto } from './dto/update-topic-video.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  FileResponseDto,
  FileUploadDto,
  PathDto,
  Public,
  Utils,
} from 'src/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TopicVideo } from './entities/topic-video.entity';
import { UtilsService } from '../utils/utils.service';
import { Response } from 'express';

@ApiBearerAuth('x-api-key')
@ApiBearerAuth()
@ApiTags('Topic Videos')
@Controller('topic-videos')
@Public()
export class TopicVideosController {
  constructor(
    private readonly topicVideosService: TopicVideosService,
    private readonly utilsService: UtilsService,
  ) {}

  @ApiOperation({ summary: 'Full text search to find topic videos' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get('search')
  async fullTextSearch(@Query() params: any) {
    const data = await this.topicVideosService.fullTextSearch(params);
    return data;
  }

  @ApiOperation({ summary: 'To find top pick for user by view sand likes' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get('top-pick')
  async topPickForYou(@Query() params: any) {
    const data = await this.topicVideosService.topPickForYou(params);
    return data;
  }

  @ApiOperation({ summary: 'Create topic video' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiCreatedResponse({
    description: 'Topic video created successfully',
    type: TopicVideo,
  })
  @Post()
  async create(@Body() createTopicVideoDto: CreateTopicVideoDto) {
    return this.topicVideosService.create(createTopicVideoDto);
  }

  @ApiOperation({ summary: 'Find all topic videos by query params' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get()
  async findAll(@Query() params: any, @Res() res: Response) {
    const { data, count } =
      await this.topicVideosService.findAllByAndCount(params);
    res.setHeader('x-total-count', count.toString()); // Update the header value with the actual count
    res.status(HttpStatus.OK).json(data);
  }

  @ApiOperation({ summary: 'Find topic video by id' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get(':id')
  findOne(@Param('id') id: string, @Query() params: any) {
    return this.topicVideosService.findOneByParams(+id, params);
  }

  @ApiOperation({ summary: 'Update topic video by id' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTopicVideoDto: UpdateTopicVideoDto,
  ) {
    return this.topicVideosService.update(+id, updateTopicVideoDto);
  }

  @ApiOperation({ summary: 'Remove topic video by id' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiOkResponse({
    status: 201,
    description: 'Topic video removed successfully',
    type: TopicVideo,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicVideosService.remove(+id);
  }

  @ApiBody({
    description: 'Topic Video',
    type: FileUploadDto,
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload topic video' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiCreatedResponse({
    description: 'Topic video uploaded successfully',
    type: FileResponseDto,
  })
  @Post('video')
  @UseInterceptors(
    FileInterceptor('file', {
      preservePath: true,
      storage: Utils.myDiskStorage('topic_videos'),
    }),
  )
  async uploadTopicVideo(@UploadedFile() file: Express.Multer.File) {
    // const originalPath = file.path;
    // const resolutions = [180, 240, 360, 480, 720];
    // try {
    //   const transcodingPaths = await this.topicVideoTranscodeService.transcodeToMultipleResolutions(
    //     originalPath,
    //     resolutions,
    //   );
    //   console.log('transcodingPaths', transcodingPaths);
    // } catch (err) {
    //   console.log(err);
    // }
    return file;
  }

  @Patch(':id/increment-views')
  incrementVideoCount(@Param('id') id: string) {
    return this.topicVideosService.incrementVideoCount(+id);
  }

  @ApiOperation({ summary: 'Remove topic video by path' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put('video/remove')
  async removeTopicVideo(@Body() pathDto: PathDto) {
    await Utils.unlinkAsync(pathDto.path);
    return pathDto;
  }

  @ApiBody({
    description: 'Topic Video thumbnail',
    type: FileUploadDto,
  })
  @ApiOperation({ summary: 'Upload topic video thumbnail' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiCreatedResponse({
    description: 'Topic video thumbnail uploaded successfully',
    type: FileResponseDto,
  })
  @Post('thumbnail')
  @UseInterceptors(
    FileInterceptor('file', {
      preservePath: true,
      storage: Utils.myDiskStorage('topic_videos_thumbnail'),
    }),
  )
  async uploadThumbnail(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  @ApiOperation({ summary: 'Remove topic video thumbnail by path' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put('thumbnail/remove')
  async removeThumbnail(@Body() pathDto: PathDto) {
    await this.utilsService.unlinkAsync(pathDto.path);
    return pathDto;
  }
}
