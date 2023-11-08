import { WebSocketGateway } from '@nestjs/websockets';
import { BaseCrudGateway } from 'src/common';
import { QuizAttempt } from './entities/quiz-attempts.entity';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'api/quiz-attempts',
})
export class QuizAttemptsGateway extends BaseCrudGateway<QuizAttempt> {}
