import { Injectable } from '@nestjs/common';

// Service responsible for handling business logic related to the application
@Injectable()
export class AppService {
  // Method to return a simple "Hello World!" string
  getHello(): string {
    return 'Hello World!';
  }
}
