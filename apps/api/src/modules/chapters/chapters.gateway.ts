import { WebSocketGateway } from '@nestjs/websockets';
import { BaseCrudGateway } from 'src/common';
import { Chapter } from './entities/chapter.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'api/chapters',
})
export class ChaptersGateway extends BaseCrudGateway<Chapter> {}
