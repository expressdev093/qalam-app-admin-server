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
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BoardClassesService } from './board-classes.service';
import { CreateBoardClassDto } from './dto/create-board-class.dto';
import { UpdateBoardClassDto } from './dto/update-board-class.dto';
import { Public } from 'src/common';
import { Response } from 'express';

@ApiBearerAuth('x-api-key')
@ApiBearerAuth()
@ApiTags('Board Classes')
@Controller('board-classes')
export class BoardClassesController {
  constructor(private readonly boardClassesService: BoardClassesService) {}

  @Post()
  create(@Body() createBoardClassDto: CreateBoardClassDto) {
    return this.boardClassesService.create(createBoardClassDto);
  }

  @Public()
  @Get()
  async findAll(@Query() params: any, @Res() res: Response) {
    const { data, count } = await this.boardClassesService.findAllByAndCount(params);
    res.setHeader('x-total-count', count.toString()); // Update the header value with the actual count
    res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardClassesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardClassDto: UpdateBoardClassDto) {
    return this.boardClassesService.update(+id, updateBoardClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardClassesService.remove(+id);
  }
}
