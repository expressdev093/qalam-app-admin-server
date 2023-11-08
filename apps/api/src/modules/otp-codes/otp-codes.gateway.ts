import { WebSocketGateway } from '@nestjs/websockets';
import { BaseCrudGateway } from 'src/common';
import { OTPCode } from './entities/otp-codes.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'api/otp-codes',
})
export class OTPCodessGateway extends BaseCrudGateway<OTPCode> {}
