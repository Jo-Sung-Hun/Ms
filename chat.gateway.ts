import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway(6974, { namespace: 'chat', cors: true })
export class ChatGateway {
  @SubscribeMessage('join')
  handleJoin(@ConnectedSocket() client: Socket, @MessageBody() roomId: string) {
    console.log(roomId);
    client.join(roomId);
  }

  @SubscribeMessage('send')
  handleSend(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; message: string; nickName: string },
  ) {
    client.to(data.roomId).emit('message', {
      nickName: data.nickName,
      message: data.message,
      roomId: data.roomId,
    });
  }
}
