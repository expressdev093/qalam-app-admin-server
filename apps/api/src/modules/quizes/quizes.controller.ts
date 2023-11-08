import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
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
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizesService } from './quizes.service';
import { Response } from 'express';
import { FileResponseDto, FileUploadDto, PathDto, Utils } from 'src/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UtilsService } from '../utils/utils.service';

@ApiTags('Quizes')
@ApiBearerAuth('x-api-key')
@ApiBearerAuth()
@Controller('quizes')
export class QuizesController {
  constructor(
    private readonly quizesService: QuizesService,
    private readonly utilsService: UtilsService,
  ) {}

  @Post()
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizesService.create(createQuizDto);
  }

  @Get()
  async findAll(@Query() params: any, @Res() res: Response) {
    const { data, count } = await this.quizesService.findAllByAndCount(params);
    res.setHeader('x-total-count', count.toString()); // Update the header value with the actual count
    res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizesService.update(+id, updateQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizesService.remove(+id);
  }

  @ApiBody({
    description: 'Quiz xlxs file',
    type: FileUploadDto,
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload quiz xlxs file' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiCreatedResponse({
    description: 'Quiz file uploaded successfully',
    type: FileResponseDto,
  })
  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      preservePath: true,
      storage: Utils.myDiskStorage('quizes'),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  @ApiOperation({ summary: 'Remove quiz file' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Put('file/remove')
  async removeFile(@Body() pathDto: PathDto) {
    await this.utilsService.unlinkAsync(pathDto.path);
    return pathDto;
  }
}
