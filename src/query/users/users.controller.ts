import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Controller('user')
export class UsersController {
  constructor(private readonly database: DatabaseService) {}

  @Get()
  getAll() {
    return this.database.getAllUsers();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    const user = this.database.getUserById(id);

    if (!user) {
      throw new HttpException('not found', 404);
    }

    return user;
  }
}
