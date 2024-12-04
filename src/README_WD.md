
# **WellFed Backend**

## **Overview**
The WellFed Backend is a RESTful API developed using **NestJS** and **MongoDB**. It provides modularized support for handling recipes, ingredients, instructions, profiles, saved recipes, tools, and more. The API is designed for seamless integration with frontend applications and supports robust CRUD operations.

---

## **Technologies Used**
1. **NestJS**: A Node.js framework for building efficient, scalable server-side applications.
2. **MongoDB**: A NoSQL database used for flexible and schema-less data storage.
3. **TypeORM**: An Object-Relational Mapper for managing MongoDB collections and documents.
4. **Postman**: Utilized for API testing and debugging.
5. **Node.js**: JavaScript runtime environment for executing server-side code.

---

## **Project Structure**
```
src/
├── app.controller.ts        # Root-level HTTP request handlers
├── app.module.ts            # Main application module
├── app.service.ts           # Application-wide services and logic
├── main.ts                  # Entry point for the application (bootstrap file)
├── modules/                 # Feature-based modules
│   ├── recipe/              # Recipe-related logic
│   │   ├── controller/      # Recipe-specific controllers
│   │   ├── entity/          # Recipe MongoDB entities
│   │   ├── service/         # Recipe business logic
│   │   ├── recipe.module.ts # Recipe module definition
│   ├── ingredient/          # Ingredient-related logic
│   ├── instruction/         # Instruction-related logic
│   ├── profile/             # Profile management
│   ├── savedrecipes/        # Saved Recipes module
│   ├── tool/                # Tool module
```

---

## **Setup and Installation**

### **Prerequisites**
1. **Node.js** (v16 or higher)
2. **MongoDB** (local, MongoDB Atlas)
3. **Postman** (or any API client)

### **Steps**
1. Clone the repository:
   ```bash
   git clone <WellfedBackend Url>
   cd WellFedBackend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the database connection:
   - Update the `TypeOrmModule` configuration in `src/app.module.ts` with our MongoDB credentials:
     ```typescript
     TypeOrmModule.forRoot({
       type: 'mongodb',
       url: 'mongodb+srv://<username>:<password>@cluster.mongodb.net/WellFed_DB',
       database: 'WellFed_DB',
       synchronize: true, // Automatically syncs schema (not recommended for production)
       useUnifiedTopology: true,
       entities: [__dirname + '/**/*.entity{.ts,.js}'],
     }),
     ```

4. Start the development server:
   ```bash
   npm run start:dev
   ```

5. The server will be running at `http://localhost:3001`.

---

## **Modules and Endpoints**

### **Recipe Module**
#### **Endpoints**
| Method | Endpoint                | Description                             |
|--------|-------------------------|-----------------------------------------|
| GET    | `/recipe`               | Fetch all recipes                       |
| GET    | `/recipe/:id`           | Fetch a specific recipe by ID           |
| POST   | `/recipe`               | Create a new recipe                     |
| PUT    | `/recipe/:id`           | Update a recipe by ID                   |
| DELETE | `/recipe/:id`           | Delete a recipe by ID                   |

#### **Key Features**
1. **Entity**: Defines the structure of a recipe in the database.
   ```typescript
   @Entity('Recipe')
   export class Recipe {
       @ObjectIdColumn() _id: ObjectId;
       @Column() title: string;
       @Column() description: string;
       @Column() category: string;
       @Column() preparationTime: number;
       @Column() servings: number;
       @Column() rating: number;
       @Column() createdAt: Date;
   }
   ```

2. **Controller**: Manages HTTP requests for recipes.
   ```typescript
   @Controller('recipe')
   export class RecipeController {
       constructor(private readonly recipeService: RecipeService) {}
       @Get() findAll(): Promise<Recipe[]> {
           return this.recipeService.findAll();
       }
   }
   ```

3. **Service**: Contains the business logic for managing recipes.
   ```typescript
   @Injectable()
   export class RecipeService {
       constructor(@InjectRepository(Recipe) private readonly recipeRepository: Repository<Recipe>) {}
       findAll(): Promise<Recipe[]> {
           return this.recipeRepository.find();
       }
   }
   ```

---

### **Profile Module**
#### **Endpoints**
| Method | Endpoint                | Description                             |
|--------|-------------------------|-----------------------------------------|
| GET    | `/profile`              | Fetch all profiles                      |
| GET    | `/profile/:id`          | Fetch a specific profile by ID          |
| POST   | `/profile`              | Create a new profile                    |
| PUT    | `/profile/:id`          | Update a profile by ID                  |

#### **Key Features**
1. **Entity**: Represents user profiles in the database.
   ```typescript
   @Entity('User')
   export class Profile {
       @ObjectIdColumn() id: ObjectId;
       @Column() firstName: string;
       @Column() lastName: string;
       @Column() email: string;
       @Column() createdAt: Date;
   }
   ```

2. **Controller**: Handles profile-related API requests.
   ```typescript
   @Controller('profile')
   export class ProfileController {
       constructor(private readonly profileService: ProfileService) {}
       @Get() getAllProfiles(): Promise<Profile[]> {
           return this.profileService.getAllProfiles();
       }
   }
   ```

3. **Service**: Implements the business logic for managing profiles.
   ```typescript
   @Injectable()
   export class ProfileService {
       constructor(@InjectRepository(Profile) private readonly profileRepository: Repository<Profile>) {}
       getAllProfiles(): Promise<Profile[]> {
           return this.profileRepository.find();
       }
   }
   ```

---

### **Similar Modules**
The structure of the **Ingredients**, **Instructions**, **Saved Recipes**, and **Tools** modules follows the same pattern:
1. **Entity**: Defines the database schema.
2. **Controller**: Handles HTTP requests.
3. **Service**: Implements business logic.

Refer to the Recipe or Profile modules for detailed examples.

---

## **Testing**
Use **Postman** to test the endpoints:
1. Import the API collection or manually configure requests.
2. Validate endpoints with appropriate request methods (GET, POST, PUT, DELETE).
3. Ensure proper payloads are sent for POST and PUT requests.

---

## **Contact**
For any questions or contributions, contact the project maintainer or refer to the GitHub repository.

