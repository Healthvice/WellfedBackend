import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { FriendsService } from '../service/friends.service';
import { Friends } from '../entity/friends.entity';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) { }

  // Get all friends records
  @Get()
  findAll(): Promise<Friends[]> {
    return this.friendsService.findAll();
  }

  // Get a specific friend record by ID
  @Get(':_id')
  findOne(@Param('_id') id: string): Promise<Friends> {
    return this.friendsService.findOne(id);
  }

  // Get all friends of a specific user by Clerk ID
  @Get('user/:clerkId')
  findByClerkId(@Param('clerkId') clerkId: string): Promise<Friends> {
    return this.friendsService.findByClerkId(clerkId);
  }

  // Get all blocked users for a specific user
  @Get('user/:clerkId/blocked')
  getBlockedUsers(@Param('clerkId') clerkId: string): Promise<string[]> {
    return this.friendsService.getBlockedUsers(clerkId);
  }

  // Add a new friends record
  @Post()
  create(@Body() friendsData: Partial<Friends>): Promise<Friends> {
    return this.friendsService.create(friendsData);
  }

  // Update a friends record by ID
  @Put(':id')
  update(@Param('id') id: string, @Body() friendsData: Partial<Friends>): Promise<Friends> {
    return this.friendsService.update(id, friendsData);
  }

  // Add a new friend to the user's friends list
  @Put('add-friend/:userId')
  addFriend(
    @Param('userId') userId: string,
    @Body() friendId: string,
  ): Promise<Friends> {
    return this.friendsService.addFriend(userId, friendId);
  }

  // Block a user
  @Put('block-user/:userId')
  blockUser(
    @Param('userId') userId: string,
    @Body() blockedUserId: string,
  ): Promise<Friends> {
    return this.friendsService.blockUser(userId, blockedUserId);
  }

  // Delete a specific friends record by ID
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.friendsService.delete(id);
  }

}
