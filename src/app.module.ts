import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './modules/profile/profile.module';
import { RecipeModule } from './modules/recipe/recipe.module';
import { IngredientModule } from './modules/ingredient/ingredient.module';
import { InstructionModule } from './modules/instruction/instruction.module';
import { NutritionModule } from './modules/nutrition/nutrition.module';
import { ReviewModule } from './modules/review/review.module';
import { SavedRecipesModule } from './modules/savedrecipes/savedrecipes.module';
import { ToolModule } from './modules/tool/tool.module';
import { IngredientController } from './modules/ingredient/controller/ingredient.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://rithvikvelapati:oaQemZKZcKQetcbl@wellfed-cluster.qe51k.mongodb.net/WellFed_DB?retryWrites=true&w=majority',
      useUnifiedTopology: true,
      database: 'WellFed_DB',
      synchronize: true, // Only in non-production environments
      logging: true, // Enable for debugging
      ssl: true, // Ensure SSL is used
      sslValidate: true, // Enforce SSL validation
      sslCA: __dirname + '/certificates/ca-certificate.crt', // Optional: Add custom CA if required
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    
    
    
    ProfileModule,
    RecipeModule,
    IngredientModule,
    InstructionModule,
    NutritionModule,
    ReviewModule,
    SavedRecipesModule,
    ToolModule,
  ],
  controllers: [AppController, IngredientController],
  providers: [AppService],
})
export class AppModule {}
