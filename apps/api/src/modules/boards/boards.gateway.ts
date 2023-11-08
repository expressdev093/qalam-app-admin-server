import { WebSocketGateway } from '@nestjs/websockets';
import { BaseCrudGateway } from 'src/common';
import { Board } from './entities/board.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'api/boards',
})
export class BoardsGateway extends BaseCrudGateway<Board> {}
