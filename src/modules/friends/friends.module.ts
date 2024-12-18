import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friends } from './entity/friends.entity';
import { FriendsController } from './controller/friends.controller';
import { FriendsService } from './service/friends.service';
import { Recipe } from '../recipe/entity/recipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Friends])],
  controllers: [FriendsController],
  providers: [FriendsService],
  exports: [FriendsService], // Only if needed in other modules
})
export class FriendsModule {}
