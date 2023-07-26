import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DataBaseService } from './database/database.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dataBaseSerice: DataBaseService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/users')
  getUsers() {
    return this.dataBaseSerice.getUsers();
  }
}
