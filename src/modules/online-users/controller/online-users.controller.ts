import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { OnlineUsersService } from '../service/online-users.service';
import { OnlineUsers } from '../entity/online-users.entity';

@Controller('onlineUsers')
export class OnlineUsersController {
  constructor(private readonly onlineUsersService: OnlineUsersService) { }

  @Post()
  async create(@Body() userStatusData: Partial<OnlineUsers>): Promise<OnlineUsers> {
    return this.onlineUsersService.create(userStatusData);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<OnlineUsers> {
    const userStatus = await this.onlineUsersService.findById(id);
    if (!userStatus) {
      throw new NotFoundException(`User status with ID ${id} not found`);
    }
    return userStatus;
  }

  @Get()
  async findAll(): Promise<OnlineUsers[]> {
    return this.onlineUsersService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() userStatusData: Partial<OnlineUsers>): Promise<OnlineUsers> {
    return this.onlineUsersService.update(id, userStatusData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.onlineUsersService.delete(id);
  }
}
