import { Module } from '@nestjs/common';
import { FriendRequestGateway } from 'src/gateway/friend-request.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [FriendRequestGateway],
  exports: [FriendRequestGateway], // Only if needed in other modules
})
export class GatewayModule {}
