import { WebSocketGateway } from '@nestjs/websockets';
import { BaseCrudGateway } from 'src/common';
import { UserQuiz } from './entities/user-quiz.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'api/user-quizzes',
})
export class UserQuizGateway extends BaseCrudGateway<UserQuiz> {}
