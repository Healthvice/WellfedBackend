import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OnlineUsers } from './entity/online-users.entity';
import { OnlineUsersController } from './controller/online-users.controller';
import { OnlineUsersService } from './service/online-users.service';
import { Recipe } from '../recipe/entity/recipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OnlineUsers])],
  controllers: [OnlineUsersController],
  providers: [OnlineUsersService],
  exports: [OnlineUsersService], // Only if needed in other modules
})
export class OnlineUsersModule {}
