import { WebSocketGateway } from '@nestjs/websockets';
import { BaseCrudGateway } from 'src/common';
import { Subject } from './entities/subject.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'api/subjects',
})
export class SubjectsGateway extends BaseCrudGateway<Subject> {}
