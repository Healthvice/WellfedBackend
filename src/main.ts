import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  // Create a NestJS application instance using the root module
  const app = await NestFactory.create(AppModule);

  // Enable Cross-Origin Resource Sharing (CORS) to allow communication
  // between the backend and frontend hosted on different domains
  app.enableCors({
    origin: 'http://localhost:3000', // The frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allows credentials such as cookies or authentication tokens
  });

  // Start the server and listen on port 3001
  await app.listen(3001);
}

// Bootstrap the application
bootstrap();
