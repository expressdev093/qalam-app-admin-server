import { WebSocketGateway } from '@nestjs/websockets';
import { BaseCrudGateway } from 'src/common';
import { Quiz } from './entities/quiz.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'api/quizes',
})
export class QuizsGateway extends BaseCrudGateway<Quiz> {}
