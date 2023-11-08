import { WebSocketGateway } from '@nestjs/websockets';
import { BaseCrudGateway } from 'src/common';
import { Mcq } from './entities/mcq.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'api/mcqs',
})
export class McqsGateway extends BaseCrudGateway<Mcq> {}
