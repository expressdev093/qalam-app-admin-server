import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MailService } from './mail.service';
import { MailDto } from './dto/mail.dto';

@ApiTags('Mail')
@ApiBearerAuth('x-api-key')
@ApiBearerAuth()
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async sendMail(@Body() mailDto: MailDto) {
    return this.mailService.sendTestEmail(mailDto);
  }
}
