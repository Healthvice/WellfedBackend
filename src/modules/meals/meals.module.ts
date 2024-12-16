import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meals } from './entity/meals.entity';
import { MealsService } from './service/meals.service';
import { MealsController } from './controller/meals.controller';
import { Recipe } from '../recipe/entity/recipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meals]), TypeOrmModule.forFeature([Recipe])],
  providers: [MealsService],
  controllers: [MealsController],
})
export class MealsModule {}
