import { WebSocketGateway } from '@nestjs/websockets';
import { BaseCrudGateway } from 'src/common';
import { AppCorner } from './entities/app-corner.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'api/app-corners',
})
export class AppCornersGateway extends BaseCrudGateway<AppCorner> {}
