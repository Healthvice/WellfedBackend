import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FriendRequests } from '../entity/friends-requests.entity';
import { ObjectId } from 'mongodb';
import { FriendRequestGateway } from 'src/gateway/friend-request.gateway';
import { FriendsService } from 'src/modules/friends/service/friends.service';

@Injectable()
export class FriendRequestsService {
  constructor(
    @InjectRepository(FriendRequests)
    private readonly friendRequestRepository: Repository<FriendRequests>,
    private readonly friendRequestGateway: FriendRequestGateway,
    private readonly friendsService: FriendsService
  ) { }

  // Get all friend requests
  async findAll(): Promise<FriendRequests[]> {
    return this.friendRequestRepository.find();
  }

  // Get all friend requests sent by a specific user
  async findByFromUser(fromUser: string): Promise<FriendRequests[]> {
    return this.friendRequestRepository.find({ where: { fromUser } });
  }

  // Get all friend requests received by a specific user
  async findByToUser(toUser: string): Promise<FriendRequests[]> {
    return this.friendRequestRepository.find({ where: { toUser } });
  }

  // Create a new friend request
  async create(requestData: Partial<FriendRequests>): Promise<FriendRequests> {
    const newRequest = this.friendRequestRepository.create(requestData);
    return this.friendRequestRepository.save(newRequest);
  }

  // Update the status of a friend request
  async updateStatus(id: string, status: string): Promise<FriendRequests> {
    const request = await this.friendRequestRepository.findOneBy({ _id: new ObjectId(id) });
    if (!request) {
      throw new Error('Friend request not found');
    }
    request.status = status;
    return this.friendRequestRepository.save(request);
  }

  // Delete a friend request by ID
  async delete(id: string): Promise<void> {
    const result = await this.friendRequestRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('Friend request not found');
    }
  }

  async sendFriendRequest(fromUserId: string, toUserId: string) {
    const newFriendRequest = this.friendRequestRepository.create({
      fromUser: fromUserId,
      toUser: toUserId,
      status: 'pending', // Status of the friend request
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.friendRequestRepository.save(newFriendRequest);

    // Send push notification through socket
    this.friendRequestGateway.emitFriendRequest(toUserId, {
      fromUserId,
      message: `You have a new friend request from ${fromUserId}`,
    });
  }

  async acceptFriendRequest(requestId: string, userId: string) {
    const request = await this.friendRequestRepository.findOneBy({ _id: new ObjectId(requestId)});
    if (!request) {
      throw new Error('Friend request not found');
    }

    // Update status to 'accepted'
    request.status = 'accepted';
    request.updatedAt = new Date();
    await this.friendRequestRepository.save(request);
    await this.friendsService.addFriend(userId, request.toUser)

    // Emit notification of acceptance
    this.friendRequestGateway.emitFriendRequest(request.fromUser, {
      toUserId: request.toUser,
      message: 'Your friend request has been accepted',
    });
  }
}
