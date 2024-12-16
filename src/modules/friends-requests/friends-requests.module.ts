import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRequests } from './entity/friends-requests.entity';
import { FriendRequestController } from './controller/friends-requests.controller';
import { FriendRequestsService } from './service/friends-requests.service';
import { Recipe } from '../recipe/entity/recipe.entity';
import { FriendRequestGateway } from 'src/gateway/friend-request.gateway';
import { GatewayModule } from 'src/gateway/gateway.module';
import { FriendsService } from '../friends/service/friends.service';
import { FriendsModule } from '../friends/friends.module';

@Module({
  imports: [TypeOrmModule.forFeature([FriendRequests]), GatewayModule, FriendsModule],
  controllers: [FriendRequestController],
  providers: [FriendRequestsService],
  exports: [FriendRequestsService], // Only if needed in other modules
})
export class FriendsRequestsModule {}
