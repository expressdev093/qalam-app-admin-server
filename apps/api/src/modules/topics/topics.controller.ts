import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Put,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Role } from '../users/enum/role.enum';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Topic } from './entities/topic.entity';
import { FileResponseDto, FileUploadDto, PathDto, Public, Roles, Utils } from 'src/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UtilsService } from '../utils/utils.service';
import { Response } from 'express';

@ApiTags('Topics')
@Controller('topics')
@ApiBearerAuth('x-api-key')
@ApiBearerAuth()
export class TopicsController {
  constructor(
    private readonly topicsService: TopicsService,
    private readonly utilsService: UtilsService,
  ) {}

  @ApiOperation({ summary: 'Create new topic' })
  @ApiResponse({ status: 403, description: 'Forbidden.', type: Topic })
  @Roles(Role.Admin)
  @Post()
  create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicsService.create(createTopicDto);
  }

  @Get()
  async findAll(@Query() params: any, @Res() res: Response) {
    const { data, count } = await this.topicsService.findAllByAndCount(params);
    res.setHeader('x-total-count', count.toString()); // Update the header value with the actual count
    res.status(HttpStatus.OK).json(data);
  }

  @Public()
  @Get('topics-with-videos')
  async findAllWithVideos(@Query() params: any) {
    const data = await this.topicsService.findAllWithVideos(params);
    return data;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
    return this.topicsService.update(+id, updateTopicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicsService.remove(+id);
  }

  @ApiBody({
    description: 'Topic Image',
    type: FileUploadDto,
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload topic image' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiCreatedResponse({
    description: 'Topic image uploaded successfully',
    type: FileResponseDto,
  })
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      preservePath: true,
      storage: Utils.myDiskStorage('topics'),
    }),
  )
  async uploadProfilePicture(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  @ApiOperation({ summary: 'Remove topic image' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Put('image/remove')
  async removeImage(@Body() pathDto: PathDto) {
    await this.utilsService.unlinkAsync(pathDto.path);
    return pathDto;
  }
}
