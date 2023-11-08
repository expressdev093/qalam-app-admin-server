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
import { ApiBearerAuth, ApiFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '../users/enum/role.enum';
import { Roles } from 'src/common';
import { CreateWebsiteContentDto } from './dto/create-website-content.dto';
import { UpdateWebsiteContentDto } from './dto/update-website-content.dto';
import { WebsiteContentService } from './website-content.service';
import { Response } from 'express';

@ApiTags('Website-Content')
@ApiBearerAuth('x-api-key')
@ApiBearerAuth()
@Controller('website-contents')
export class WebsiteContentController {
  constructor(private readonly service: WebsiteContentService) {}

  @ApiOperation({ summary: 'Add new' })
  @ApiFoundResponse({ description: 'Forbidden.' })
  @Roles(Role.Admin)
  @Post()
  create(@Body() createDto: CreateWebsiteContentDto) {
    return this.service.create(createDto);
  }

  @Get()
  async findAll(@Query() params: any, @Res() res: Response) {
    const { data, count } = await this.service.findAllByAndCount(params);
    res.setHeader('x-total-count', count.toString()); // Update the header value with the actual count
    res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateWebsiteContentDto) {
    return this.service.update(+id, updateDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
