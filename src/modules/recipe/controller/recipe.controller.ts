import { Controller, Get, Post, Put, Delete, Param, Body, HttpException } from '@nestjs/common';
import { RecipeService } from '../service/recipe.service';
import { Recipe } from '../entity/recipe.entity';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) { }

  // Get all recipes
  @Get()
  findAll(): Promise<Recipe[]> {
    return this.recipeService.findAll();
  }

  // Get a single recipe by ID
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Recipe> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new HttpException('Invalid recipe ID', 400);
    }
    return this.recipeService.findOne(id);
  }
  
  // Create a new recipe
  @Post('save-all')
  async createAll(@Body() recipeDataList: Partial<Recipe>[]): Promise<boolean> {
    for (const recipeData of recipeDataList) {
      await this.recipeService.create(recipeData);
    }
    return true;
  }

  // Create a new recipe
  @Put('update-all')
  async updateAll(@Body() recipeDataList: Partial<Recipe>[]): Promise<boolean> {
    for (const recipeData of recipeDataList) {
      await this.recipeService.updateAll(recipeData);
    }
    return true;
  }

  // Create a new recipe
  @Post()
  create(@Body() recipeData: Partial<Recipe>): Promise<Recipe> {
    return this.recipeService.create(recipeData);
  }

  // Update a recipe by ID
  @Put(':id')
  update(@Param('id') id: string, @Body() recipeData: Partial<Recipe>): Promise<Recipe> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new HttpException('Invalid recipe ID', 400);
    }
    return this.recipeService.update(id, recipeData);
  }

  // Delete a recipe by ID
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new HttpException('Invalid recipe ID', 400);
    }
    return this.recipeService.remove(id);
  }
}
