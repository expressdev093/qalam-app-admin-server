import {
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

export class BaseCrudGateway<T> {
  @WebSocketServer()
  protected server: Server;

  @SubscribeMessage('create')
  create(@MessageBody() data: T, @ConnectedSocket() client: Socket) {
    client.broadcast.emit('create', data);
    return data;
  }

  @SubscribeMessage('update')
  update(@MessageBody() data: T, @ConnectedSocket() client: Socket) {
    this.server.emit('update', data);

    return data;
  }

  @SubscribeMessage('remove')
  remove(@MessageBody() data: T, @ConnectedSocket() client: Socket) {
    this.server.emit('remove', data);
    return data;
  }
}
