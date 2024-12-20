import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// Controller to handle incoming HTTP requests
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Handle GET requests at the root path and return a string response
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
