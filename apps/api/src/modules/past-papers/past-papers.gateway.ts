import { WebSocketGateway } from '@nestjs/websockets';
import { BaseCrudGateway } from 'src/common';
import { PastPaper } from './entities/past-papers.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'api/past-papers',
})
export class PastPapersGateway extends BaseCrudGateway<PastPaper> {}
