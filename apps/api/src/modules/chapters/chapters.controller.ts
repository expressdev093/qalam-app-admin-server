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
  Req,
  Query,
  ParseIntPipe,
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
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileResponseDto, FileUploadDto, PathDto, Roles, Utils } from 'src/common';

import { Role } from '../users/enum/role.enum';
import { UtilsService } from '../utils/utils.service';
import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { Chapter } from './entities/chapter.entity';
import { Response } from 'express';

@ApiBearerAuth('x-api-key')
@ApiBearerAuth()
@ApiTags('Chapter')
@Controller('chapters')
export class ChaptersController {
  constructor(
    private readonly chaptersService: ChaptersService,
    private readonly utilsService: UtilsService,
  ) {}

  @ApiOperation({ summary: 'Create new chapter' })
  @ApiResponse({ status: 403, description: 'Forbidden.', type: Chapter })
  @Roles(Role.Admin)
  @Post()
  create(@Body() createChapterDto: CreateChapterDto) {
    return this.chaptersService.create(createChapterDto);
  }

  @Get()
  async findAll(@Query() params: any, @Res() res: Response) {
    const { data, count } = await this.chaptersService.findAllByAndCount(params);
    res.setHeader('x-total-count', count.toString()); // Update the header value with the actual count
    res.status(HttpStatus.OK).json(data);

    //return this.chaptersService.chapterSubjectFindAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.chaptersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateChapterDto: UpdateChapterDto) {
    return this.chaptersService.update(+id, updateChapterDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.chaptersService.remove(+id);
  }

  @ApiBody({
    description: 'Chapter image',
    type: FileUploadDto,
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload chapter image' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiCreatedResponse({
    description: 'Chapter image uploaded successfully',
    type: FileResponseDto,
  })
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      preservePath: true,
      storage: Utils.myDiskStorage('chapter'),
    }),
  )
  async uploadProfilePicture(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  @ApiOperation({ summary: 'Remove chapter image' })
  @ApiResponse({ status: 403, description: 'Forbidden.', type: PathDto })
  @Put('image/remove')
  async removeImage(@Body() pathDto: PathDto) {
    await this.utilsService.unlinkAsync(pathDto.path);
    return pathDto;
  }
}
