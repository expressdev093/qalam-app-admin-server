import { Global, Module } from '@nestjs/common';
import { UtilsService } from './utils.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [UtilsService],
  exports: [UtilsService],
})
export class UtilsModule {}
