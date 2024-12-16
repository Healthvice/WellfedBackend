import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, NotFoundException } from '@nestjs/common';
import { MealsService } from '../service/meals.service';
import { Meals } from '../entity/meals.entity';

@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) { }

  @Post()
  async create(@Body() mealData: Partial<Meals>): Promise<Meals> {
    return this.mealsService.create(mealData);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Meals> {
    const meal = await this.mealsService.findById(id);
    if (!meal) {
      throw new NotFoundException(`Meal with ID ${id} not found`);
    }
    return meal;
  }

  @Get()
  async findAll(): Promise<Meals[]> {
    return this.mealsService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() mealData: Partial<Meals>): Promise<Meals> {
    return this.mealsService.update(id, mealData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.mealsService.delete(id);
  }

  @Get('date/:date')
  async findByDate(@Param('date') date: string): Promise<Meals[]> {
    return this.mealsService.findByDate(date);
  }

  @Get('user/:userId')
  async findByCreatedBy(@Param('userId') userId: string): Promise<Meals[]> {
    return this.mealsService.findByCreatedBy(userId);
  }
}
