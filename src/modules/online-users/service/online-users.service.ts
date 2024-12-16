import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OnlineUsers } from '../entity/online-users.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class OnlineUsersService {
  constructor(
    @InjectRepository(OnlineUsers)
    private readonly onlineUsersRepository: Repository<OnlineUsers>,
  ) { }


  async create(userStatusData: Partial<OnlineUsers>): Promise<OnlineUsers> {
    const newUserStatus = this.onlineUsersRepository.create(userStatusData);
    return this.onlineUsersRepository.save(newUserStatus);
  }

  async findById(id: string): Promise<OnlineUsers> {
    return this.onlineUsersRepository.findOne({ where: { _id: new ObjectId(id) } });
  }

  async findAll(): Promise<OnlineUsers[]> {
    return this.onlineUsersRepository.find();
  }

  async update(id: string, userStatusData: Partial<OnlineUsers>): Promise<OnlineUsers> {
    await this.onlineUsersRepository.update(id, userStatusData);
    return this.onlineUsersRepository.findOne({ where: { _id: new ObjectId(id) } });
  }

  async delete(id: string): Promise<void> {
    await this.onlineUsersRepository.delete(id);
  }
}
