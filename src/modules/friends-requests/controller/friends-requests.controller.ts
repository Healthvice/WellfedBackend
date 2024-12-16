import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { FriendRequestsService } from '../service/friends-requests.service';
import { FriendRequests } from '../entity/friends-requests.entity';

@Controller('friends-request')
export class FriendRequestController {
  constructor(private readonly friendRequestService: FriendRequestsService) { }

  // Get all friend requests
  @Get()
  findAll(): Promise<FriendRequests[]> {
    return this.friendRequestService.findAll();
  }

  // Get all friend requests sent by a specific user
  @Get('from/:fromUser')
  findByFromUser(@Param('fromUser') fromUser: string): Promise<FriendRequests[]> {
    return this.friendRequestService.findByFromUser(fromUser);
  }

  // Get all friend requests received by a specific user
  @Get('to/:toUser')
  findByToUser(@Param('toUser') toUser: string): Promise<FriendRequests[]> {
    return this.friendRequestService.findByToUser(toUser);
  }

  // Create a new friend request
  @Post()
  create(@Body() requestData: Partial<FriendRequests>): Promise<FriendRequests> {
    return this.friendRequestService.create(requestData);
  }

  // Update the status of a friend request
  @Put(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<FriendRequests> {
    return this.friendRequestService.updateStatus(id, status);
  }

  // Delete a friend request by ID
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.friendRequestService.delete(id);
  }

  @Post('send/:toUserId')
  async sendFriendRequest(
    @Param('toUserId') toUserId: string,
    @Body('fromUserId') fromUserId: string
  ) {
    return this.friendRequestService.sendFriendRequest(fromUserId, toUserId);
  }

  @Post('accept/:requestId')
  async acceptFriendRequest(@Param('requestId') requestId: string,  @Body('userId') userId: string) {
    return this.friendRequestService.acceptFriendRequest(requestId, userId);
  }


}
