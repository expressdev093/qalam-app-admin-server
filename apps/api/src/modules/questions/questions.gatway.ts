import { WebSocketGateway } from '@nestjs/websockets';
import { BaseCrudGateway } from 'src/common';
import { Question } from './entities/question.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'api/questions',
})
export class QuestionsGateway extends BaseCrudGateway<Question> {}
