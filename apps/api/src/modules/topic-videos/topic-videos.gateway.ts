import { WebSocketGateway } from '@nestjs/websockets';
import { BaseCrudGateway } from 'src/common';
import { TopicVideo } from './entities/topic-video.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'api/topic-videos',
})
export class TopicVideosGateway extends BaseCrudGateway<TopicVideo> {}
