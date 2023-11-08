import { WebSocketGateway } from '@nestjs/websockets';
import { BaseCrudGateway } from 'src/common';
import { WebsiteContent } from './entities/website-content.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'api/website-contents',
})
export class WebsiteContentGateway extends BaseCrudGateway<WebsiteContent> {}
