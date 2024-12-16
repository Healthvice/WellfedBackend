// src/gateway/friend-request.gateway.ts
import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(4000, { namespace: 'friend-requests', cors: { origin: '*' } })
export class FriendRequestGateway
    implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    @WebSocketServer() server: Server;

    private connectedUsers: Map<string, string> = new Map(); // Maps socket ID to user ID

    afterInit(server: Server) {
        console.log('WebSocket Gateway Initialized', server);
    }

    handleConnection(client: Socket) {
        const userId = client.handshake.query.userId as string; // Expecting userId from the client query string
        if (userId) {
            this.connectedUsers.set(client.id, userId); // Map socket ID to user ID
            console.log(`User connected: ${userId}`);
        } else {
            console.warn(`Connection attempt without userId: ${client.id}`);
            client.disconnect(); // Optionally disconnect clients without a userId
        }
        this.updateAllConnectedUsers()
        console.log(`Client connected: ${client.id}`);
        // You can handle any logic for new connections here, such as authenticating users
    }

    handleDisconnect(client: Socket) {
        const userId = this.connectedUsers.get(client.id);

        if (userId) {
            console.log(`User disconnected: ${userId}`);
            this.connectedUsers.delete(client.id); // Remove the user from the connected list
        } else {
            console.warn(`Disconnected client not found in list: ${client.id}`);
        }
        this.updateAllConnectedUsers()
        console.log(`Client disconnected: ${client.id}`);
        // Handle any cleanup if needed when a client disconnects
    }


    @SubscribeMessage('newMessage')
    newMessage(@MessageBody() body: string) {
        console.log(body)

    }

    // Emit a friend request event

    emitFriendRequest(userId: string, data: any) {
        this.server.emit(userId, data);
    }

    // Optional: Get all online users
    @SubscribeMessage('getOnlineUsers')
    getOnlineUsers(client: Socket)   {
        const userId = this.connectedUsers.get(client.id);

        this.server.emit(userId, [...this.connectedUsers.values()]);
    }

    updateAllConnectedUsers() {
        this.connectedUsers.forEach((userId, socketId) => {
            this.server.emit(userId, [...this.connectedUsers.values()]);
            console.log(`Message sent to User ID: ${userId}`);
          });
        
    }
}
