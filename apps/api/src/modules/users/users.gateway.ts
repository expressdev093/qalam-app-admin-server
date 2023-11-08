import { WebSocketGateway } from '@nestjs/websockets';
import { BaseCrudGateway } from 'src/common';
import { User } from './entities/user.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'api/users',
})
export class UsersGateway extends BaseCrudGateway<User> {}
