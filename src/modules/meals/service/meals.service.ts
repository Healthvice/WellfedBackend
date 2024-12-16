import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meals } from '../entity/meals.entity';
import { ObjectId } from 'mongodb';
import { Recipe } from 'src/modules/recipe/entity/recipe.entity';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
    @InjectRepository(Meals)
    private readonly mealRepository: Repository<Meals>,
  ) { }


  async create(mealData: Partial<Meals>): Promise<Meals> {
    const newMeal = this.mealRepository.create(mealData);
    return await this.mealRepository.save(newMeal);
  }

  async findById(id: string): Promise<Meals> {
    const meal = await this.mealRepository.findOne({ where: { _id: new ObjectId(id) } });
    if (!meal) {
      throw new NotFoundException(`Meal with ID ${id} not found`);
    }
    return meal;
  }

  async findAll(): Promise<Meals[]> {
    return this.mealRepository.find();
  }

  async update(id: string, mealData: Partial<Meals>): Promise<Meals> {
    await this.mealRepository.update(id, mealData);
    const updatedMeal = await this.mealRepository.findOne({ where: { _id: new ObjectId(id) } });
    if (!updatedMeal) {
      throw new NotFoundException(`Meal with ID ${id} not found`);
    }
    return updatedMeal;
  }

  async delete(id: string): Promise<void> {
    const result = await this.mealRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Meal with ID ${id} not found`);
    }
  }

  async findByDate(date: string): Promise<Meals[]> {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new NotFoundException(`Invalid date format: ${date}`);
    }
    return this.mealRepository.find({ where: { date: parsedDate } });
  }

  async findByCreatedBy(userId: string): Promise<Meals[]> {
    return this.mealRepository.find({ where: { createdBy: userId } });
  }
}
