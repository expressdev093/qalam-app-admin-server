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
import { CreatePastPaperDto } from './dto/create-past-papers.dto';
import { PastPaper } from './entities/past-papers.entity';
import { UpdatePastPaperDto } from './dto/update-past-papers.dto';
import { PastPapersService } from './past-papers.service';
import { Response } from 'express';

@ApiBearerAuth('x-api-key')
@ApiBearerAuth()
@ApiTags('Past Paper')
@Controller('past-papers')
export class PastPapersController {
  constructor(
    private readonly pastPaperService: PastPapersService,
    private readonly utilsService: UtilsService,
  ) {}

  @Get('years')
  async findNearestClass() {
    return this.pastPaperService.getDistinctYears();
  }

  @ApiOperation({ summary: 'Create new Past Paper' })
  @ApiResponse({ status: 403, description: 'Forbidden.', type: PastPaper })
  @Roles(Role.Admin)
  @Post()
  create(@Body() createPastPaperDto: CreatePastPaperDto) {
    return this.pastPaperService.create(createPastPaperDto);
  }

  @Get()
  async findAll(@Query() params: any, @Res() res: Response) {
    const { data, count } = await this.pastPaperService.findAllByAndCount(params);
    res.setHeader('x-total-count', count.toString()); // Update the header value with the actual count
    res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.pastPaperService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updatePastPaperDto: UpdatePastPaperDto) {
    return this.pastPaperService.update(+id, updatePastPaperDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.pastPaperService.remove(+id);
  }

  @ApiBody({
    description: 'Past Paper file',
    type: FileUploadDto,
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload Past Paper file' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiCreatedResponse({
    description: 'Past Paper file uploaded successfully',
    type: FileResponseDto,
  })
  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      preservePath: true,
      storage: Utils.myDiskStorage('past_papers'),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  @ApiOperation({ summary: 'Remove Past Paper file' })
  @ApiResponse({ status: 403, description: 'Forbidden.', type: PathDto })
  @Put('file/remove')
  async removeImage(@Body() pathDto: PathDto) {
    await this.utilsService.unlinkAsync(pathDto.path);
    return pathDto;
  }
}
