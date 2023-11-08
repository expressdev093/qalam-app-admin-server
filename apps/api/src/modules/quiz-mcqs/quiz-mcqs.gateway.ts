import { WebSocketGateway } from '@nestjs/websockets';
import { BaseCrudGateway } from 'src/common';
import { QuizMcq } from './entities/quiz-mcq.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'api/quiz-mcqs',
})
export class QuizMcqsGateway extends BaseCrudGateway<QuizMcq> {}
