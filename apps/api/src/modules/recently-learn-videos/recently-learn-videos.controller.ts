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
import { RecentlyLearnVideosService } from './recently-learn-videos.service';
import { CreateRecentlyLearnVideoDto } from './dto/create-recently-learn-video.dto';
import { UpdateRecentlyLearnVideoDto } from './dto/update-recently-learn-video.dto';
import { ApiBearerAuth, ApiFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common';
import { Role } from '../users/enum/role.enum';
import { Response } from 'express';

@ApiTags('Recently Learn Videos')
@ApiBearerAuth('x-api-key')
@ApiBearerAuth()
@Controller('recently-learn-videos')
export class RecentlyLearnVideosController {
  constructor(private readonly recentlyLearnVideosService: RecentlyLearnVideosService) {}

  @ApiOperation({ summary: 'Create new subject' })
  @ApiFoundResponse({ description: 'Forbidden.' })
  @Roles(Role.User)
  @Post()
  create(@Body() createRecentlyLearnVideoDto: CreateRecentlyLearnVideoDto) {
    return this.recentlyLearnVideosService.create(createRecentlyLearnVideoDto);
  }

  @Get()
  async findAll(@Query() params: any, @Res() res: Response) {
    const { data, count } = await this.recentlyLearnVideosService.findAllByAndCount(params);
    res.setHeader('x-total-count', count.toString()); // Update the header value with the actual count
    res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recentlyLearnVideosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecentlyLearnVideoDto: UpdateRecentlyLearnVideoDto,
  ) {
    return this.recentlyLearnVideosService.update(+id, updateRecentlyLearnVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recentlyLearnVideosService.remove(+id);
  }
}
