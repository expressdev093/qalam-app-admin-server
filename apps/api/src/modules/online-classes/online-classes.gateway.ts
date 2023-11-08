import { WebSocketGateway } from '@nestjs/websockets';
import { BaseCrudGateway } from 'src/common';
import { OnlineClass } from './entities/online-class.entity';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'api/online-classes',
})
export class OnlineClassesGateway extends BaseCrudGateway<OnlineClass> {}
