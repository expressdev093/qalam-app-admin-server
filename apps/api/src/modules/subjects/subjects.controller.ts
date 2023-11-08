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
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Role } from '../users/enum/role.enum';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  FileResponseDto,
  FileUploadDto,
  PathDto,
  Public,
  Roles,
  Utils,
} from 'src/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UtilsService } from '../utils/utils.service';
import { Response } from 'express';

@ApiTags('Subjects')
@ApiBearerAuth('x-api-key')
@ApiBearerAuth()
@Controller('subjects')
export class SubjectsController {
  constructor(
    private readonly subjectsService: SubjectsService,
    private readonly utilsService: UtilsService,
  ) {}

  @ApiOperation({ summary: 'Create new subject' })
  @ApiFoundResponse({ description: 'Forbidden.' })
  @Roles(Role.Admin)
  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto);
  }

  @Get()
  async findAll(@Query() params: any, @Res() res: Response) {
    const { data, count } =
      await this.subjectsService.findAllByAndCount(params);
    res.setHeader('x-total-count', count.toString()); // Update the header value with the actual count
    res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectsService.findOne(+id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectsService.update(+id, updateSubjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectsService.remove(+id);
  }

  @ApiBody({
    description: 'Subject image',
    type: FileUploadDto,
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload subject image' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiCreatedResponse({
    description: 'Subject image uploaded successfully',
    type: FileResponseDto,
  })
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      preservePath: true,
      storage: Utils.myDiskStorage('subjects'),
    }),
  )
  async uploadProfilePicture(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  @ApiOperation({ summary: 'Remove subject image' })
  @ApiResponse({ status: 403, description: 'Forbidden.', type: PathDto })
  @Put('image/remove')
  async removeImage(@Body() pathDto: PathDto) {
    await this.utilsService.unlinkAsync(pathDto.path);
    return pathDto;
  }

  // @ApiBody({
  //   description: 'Subject icon',
  //   type: FileUploadDto,
  // })
  // @ApiConsumes('multipart/form-data')
  // @ApiOperation({ summary: 'Upload subject icon' })
  // @ApiForbiddenResponse({ description: 'Forbidden.' })
  // @ApiCreatedResponse({
  //   description: 'Subject icon uploaded successfully',
  //   type: FileResponseDto,
  // })
  // @Post('icon')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     preservePath: true,
  //     storage: Utils.myDiskStorage('subjects_icons'),
  //   }),
  // )
  // async uploadIcon(@UploadedFile() file: Express.Multer.File) {
  //   return file;
  // }

  // @ApiOperation({ summary: 'Remove subject icon' })
  // @ApiResponse({ status: 403, description: 'Forbidden.', type: PathDto })
  // @Put('icon/remove')
  // async removeIcon(@Body() pathDto: PathDto) {
  //   await this.utilsService.unlinkAsync(pathDto.path);
  //   return pathDto;
  // }
}
