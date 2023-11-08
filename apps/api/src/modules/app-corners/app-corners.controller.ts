import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Put,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileResponseDto, FileUploadDto, PathDto, Utils } from 'src/common';
import { UtilsService } from '../utils/utils.service';
import { AppCornersService } from './app-corners.service';
import { CreateAppCornerDto } from './dto/create-app-corner.dto';
import { UpdateAppCornerDto } from './dto/update-app-corner.dto';
import { AppCorner } from './entities/app-corner.entity';
import { Response } from 'express';

@ApiTags('App Corner')
@ApiBearerAuth('x-api-key')
@ApiBearerAuth()
@Controller('app-corners')
export class AppCornersController {
  constructor(
    private readonly appCornersService: AppCornersService,
    private readonly utilsService: UtilsService,
  ) {}

  @ApiOperation({ summary: 'Create app corner' })
  @ApiCreatedResponse({
    description: 'App corner created successfully',
    type: AppCorner,
  })
  @Post()
  create(@Body() createAppCornerDto: CreateAppCornerDto) {
    return this.appCornersService.create(createAppCornerDto);
  }

  @Get()
  async findAll(@Query() params: any, @Res() res: Response) {
    const { data, count } =
      await this.appCornersService.findAllByAndCount(params);
    res.setHeader('x-total-count', count.toString()); // Update the header value with the actual count
    res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appCornersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppCornerDto: UpdateAppCornerDto,
  ) {
    return this.appCornersService.update(+id, updateAppCornerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appCornersService.remove(+id);
  }

  @ApiBody({
    description: 'App Corner Video',
    type: FileUploadDto,
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload App Corner video' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiCreatedResponse({
    description: 'App Corner video uploaded successfully',
    type: FileResponseDto,
  })
  @Post('video')
  @UseInterceptors(
    FileInterceptor('file', {
      preservePath: true,
      storage: Utils.myDiskStorage('app_corner_videos'),
    }),
  )
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  @ApiBody({
    description: 'App Corner Video thumbnail',
    type: FileUploadDto,
  })
  @ApiOperation({ summary: 'Upload App Corner video thumbnail' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiCreatedResponse({
    description: 'App Corner video thumbnail uploaded successfully',
    type: FileResponseDto,
  })
  @Post('thumbnail')
  @UseInterceptors(
    FileInterceptor('file', {
      preservePath: true,
      storage: Utils.myDiskStorage('app_corner_videos_thumbnail'),
    }),
  )
  async uploadThumbnail(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  @ApiBody({
    description: 'App Corner Image',
    type: FileUploadDto,
  })
  @ApiOperation({ summary: 'Upload App Corner image' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiCreatedResponse({
    description: 'App Corner image uploaded successfully',
    type: FileResponseDto,
  })
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      preservePath: true,
      storage: Utils.myDiskStorage('app_corner_image'),
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  @ApiOperation({ summary: 'Remove App Corner file ' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Put('file/remove')
  async removeFile(@Body() pathDto: PathDto) {
    await this.utilsService.unlinkAsync(pathDto.path);
    return pathDto;
  }
}
