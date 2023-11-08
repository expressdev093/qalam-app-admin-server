import { WebSocketGateway } from '@nestjs/websockets';
import { BaseCrudGateway } from 'src/common';
import { UserQuizAnswer } from './entities/user-quiz-answer.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'api/user-quiz-answers',
})
export class UserQuizAnswerGateway extends BaseCrudGateway<UserQuizAnswer> {}
