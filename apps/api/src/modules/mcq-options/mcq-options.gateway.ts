import { WebSocketGateway } from '@nestjs/websockets';
import { BaseCrudGateway } from 'src/common';
import { McqOption } from './entities/mcq-option.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'api/mcq-options',
})
export class McqOptionsGateway extends BaseCrudGateway<McqOption> {}
