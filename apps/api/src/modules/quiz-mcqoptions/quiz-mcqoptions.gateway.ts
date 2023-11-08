import { WebSocketGateway } from '@nestjs/websockets';
import { BaseCrudGateway } from 'src/common';
import { QuizMcqoption } from './entities/quiz-mcqoption.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'api/quiz-mcqoptions',
})
export class QuizMcqOptionsGateway extends BaseCrudGateway<QuizMcqoption> {}
