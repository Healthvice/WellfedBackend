import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friends } from '../entity/friends.entity';
import { Recipe } from 'src/modules/recipe/entity/recipe.entity';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friends)
    private readonly friendsRepository: Repository<Friends>,
  ) { }

  // Get all friends records
  async findAll(): Promise<Friends[]> {
    return this.friendsRepository.find();
  }

  // Get a specific friends record by ID
  async findOne(id: string): Promise<Friends> {
    const friend = await this.friendsRepository.findOne({ where: { clerkId: id } });
    if (!friend) {
      throw new NotFoundException(`Friends record with ID ${id} not found.`);
    }
    return friend;
  }

  // Get friends record for a specific user by Clerk ID
  async findByClerkId(clerkId: string): Promise<Friends> {
    const friend = await this.friendsRepository.findOne({ where: { clerkId } });
    if (!friend) {
      throw new NotFoundException(`User with Clerk ID ${clerkId} not found.`);
    }
    return friend;
  }

  // Get all blocked users for a specific user
  async getBlockedUsers(clerkId: string): Promise<string[]> {
    const user = await this.findByClerkId(clerkId);
    return user.blockedUsers;
  }

  // Add a new friends record
  async create(friendsData: Partial<Friends>): Promise<Friends> {
    const newFriend = this.friendsRepository.create(friendsData);
    return this.friendsRepository.save(newFriend);
  }

  // Update a specific friends record by ID
  async update(id: string, friendsData: Partial<Friends>): Promise<Friends> {
    const existingFriend = await this.findOne(id);
    Object.assign(existingFriend, friendsData);
    return this.friendsRepository.save(existingFriend);
  }

  // Add a new friend to the user's friends list
  async addFriend(userId: string, friendId: string): Promise<Friends> {
    const user = await this.findOne(userId);
    if (!user.friends.includes(friendId)) {
      user.friends.push(friendId);
    }
    return this.friendsRepository.save(user);
  }

  // Block a user
  async blockUser(userId: string, blockedUserId: string): Promise<Friends> {
    const user = await this.findOne(userId);
    if (!user.blockedUsers.includes(blockedUserId)) {
      user.blockedUsers.push(blockedUserId);
    }
    // Optionally remove the user from the friends list if they're being blocked
    user.friends = user.friends.filter((id) => id !== blockedUserId);
    return this.friendsRepository.save(user);
  }

  // Delete a specific friends record by ID
  async delete(id: string): Promise<void> {
    const result = await this.friendsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Friends record with ID ${id} not found.`);
    }
  }
}
