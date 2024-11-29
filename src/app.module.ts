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
      url: 'mongodb+srv://rithvikvelapati:oaQemZKZcKQetcbl@wellfed-cluster.qe51k.mongodb.net/WellFed_DB?retryWrites=true&w=majority&tls=true&tlsAllowInvalidCertificates=true',
      useUnifiedTopology: true,
      ssl: true,
      extra: {
        tlsCAFile: 'C:\\Users\\velap\\Documents\\WellfedBackend\\ca-certificates.crt', 
        tlsAllowInvalidCertificates: true, // For testing purposes
      },
      synchronize: true,  // Automatically sync schema with database (not recommended for production)
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
