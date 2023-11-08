import { WebSocketGateway } from '@nestjs/websockets';
import { BaseCrudGateway } from 'src/common';
import { Topic } from './entities/topic.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'api/topics',
})
export class TopicsGateway extends BaseCrudGateway<Topic> {}
