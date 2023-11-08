import { WebSocketGateway } from '@nestjs/websockets';
import { BaseCrudGateway } from 'src/common';
import { LoginDeviceInfo } from './entities/login-device-info.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'api/login-device-info',
})
export class LoginDeviceInfoGateway extends BaseCrudGateway<LoginDeviceInfo> {}
