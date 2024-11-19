import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from '../entity/ingredient.entity';
import { ObjectId } from 'mongodb';
import { Recipe } from 'src/modules/recipe/entity/recipe.entity';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  // Find an ingredient by _id
  async findOne(id: string): Promise<Ingredient> {
    const ingredient = await this.ingredientRepository.findOneBy({ _id: new ObjectId(id) });
    if (!ingredient) {
      throw new HttpException('Ingredient not found', 404);
    }
    return ingredient;
  }

  // Find ingredients by recipeId
  async findByRecipeId(recipeId: string): Promise<Ingredient[]> {
    console.log('Querying with recipeId:', recipeId); // Debug line
    const ingredients = await this.ingredientRepository.find({ where: { recipeId } });
    if (!ingredients.length) {
      throw new HttpException('No ingredients found for this recipe', 404);
    }
    return ingredients;
  }
  

  // Create a new ingredient
  async create(ingredientData: Partial<Ingredient>): Promise<Ingredient> {
    ingredientData.createdAt = new Date();
    ingredientData.updatedAt = new Date();
    const ingredient = this.ingredientRepository.create(ingredientData);
    return await this.ingredientRepository.save(ingredient);
  }

  // Update an existing ingredient
  async update(id: string, ingredientData: Partial<Ingredient>): Promise<Ingredient> {
    ingredientData.updatedAt = new Date();
    const existingIngredient = await this.ingredientRepository.findOneBy({ _id: new ObjectId(id) });
    if (!existingIngredient) {
      throw new HttpException('Ingredient not found', 404);
    }
    await this.ingredientRepository.update({ _id: new ObjectId(id) }, ingredientData);
    return this.findOne(id);
  }
    // Update an existing ingredient
    async updateAll(): Promise<boolean> {

      const ings = await this.ingredientRepository.find();
      for (const ing of ings) {
        
       
        const rec = await this.recipeRepository.findOne({where: {recipeId: parseInt(ing.recipeId)}})
        if(rec) {
          ing.recipeId = rec._id.toString();
          ing.updatedAt = new Date();
          ing.createdAt = new Date();
          ing.createdBy = 'Admin';
          ing.updatedBy = 'Admin';
          await this.ingredientRepository.update({ _id: new ObjectId(ing._id) }, ing);
        }
        
      }
      return true
    }

  // Get all ingredients
  async findAll(): Promise<Ingredient[]> {
    return await this.ingredientRepository.find();
  }

  // Delete an ingredient by _id
  async delete(id: string): Promise<void> {
    const deleteResult = await this.ingredientRepository.delete({ _id: new ObjectId(id) });
    if (!deleteResult.affected) {
      throw new HttpException('Ingredient not found', 404);
    }
  }
}
