import { WebSocketGateway } from '@nestjs/websockets';
import { BaseCrudGateway } from 'src/common';
import { BoardClass } from './entities/board-class.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'api/board-classes',
})
export class BoardClassesGateway extends BaseCrudGateway<BoardClass> {}
