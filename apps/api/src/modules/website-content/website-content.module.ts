import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsiteContent } from './entities/website-content.entity';
import { WebsiteContentController } from './website-content.controller';
import { WebsiteContentService } from './website-content.service';
import { WebsiteContentGateway } from './website-content.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([WebsiteContent])],
  controllers: [WebsiteContentController],
  providers: [WebsiteContentService, WebsiteContentGateway],
})
export class WebsiteContentModule {}
