import { Controller, Get, Query, Res } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Public } from './common';
import { Response } from 'express';
import { join } from 'path';
import * as fs from 'fs';
import { extname } from 'path';
import * as mime from 'mime-types';

@ApiBearerAuth('x-api-key')
@Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('file')
  async serveImage(
    @Query('path') path: string,
    @Res() res: Response,
  ): Promise<void> {
    const filePath = join(__dirname, '..', '..', path);

    try {
      const stat = await fs.promises.stat(filePath);

      if (stat.isFile()) {
        const contentType =
          mime.contentType(extname(filePath)) || 'application/octet-stream';
        res.setHeader('Content-Type', contentType);
        res.status(200).sendFile(filePath);
      } else {
        res.status(404).send('Not Found');
      }
    } catch (err) {
      if (err.code === 'ENOENT') {
        res.status(404).send('Not Found');
      } else {
        res.status(500).send('Internal Server Error');
      }
    }
  }
}
