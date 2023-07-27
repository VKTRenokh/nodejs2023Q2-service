import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from 'src/types/createUser';
import { DatabaseService } from '../database/database.service';

@Controller('user')
export class UsersController {
  constructor(private readonly database: DatabaseService) {}

  @Get()
  getAll() {
    return this.database.getAllUsers();
  }

  @Get(':id')
  @HttpCode(204)
  get(@Param('id') id: string) {
    const user = this.database.getUserById(id);

    if (!user) {
      throw new HttpException('not found', 404);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    const isDeleted = this.database.deleteUserById(id);

    if (!isDeleted) {
      throw new HttpException('user not found', 404);
    }
  }
}
