import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for the frontend's public IP
  app.enableCors({
    origin: ['http://4.157.225.65', 'http://localhost:3000'], // Add all frontend URLs here
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3001); // Ensure this matches the backend's containerPort
}
bootstrap();
