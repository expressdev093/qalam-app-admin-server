import { WebSocketGateway } from '@nestjs/websockets';
import { BaseCrudGateway } from 'src/common';
import { Exercise } from './entities/exercise.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'api/exercises',
})
export class ExercisesGateway extends BaseCrudGateway<Exercise> {}
