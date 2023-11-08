import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWebsiteContentDto } from './dto/create-website-content.dto';
import { UpdateWebsiteContentDto } from './dto/update-website-content.dto';
import { WebsiteContent } from './entities/website-content.entity';

@Injectable()
export class WebsiteContentService extends BaseService<
  WebsiteContent,
  CreateWebsiteContentDto,
  UpdateWebsiteContentDto
> {
  constructor(
    @InjectRepository(WebsiteContent)
    private readonly websiteContentRepository: Repository<WebsiteContent>,
  ) {
    super(websiteContentRepository);
  }
}
