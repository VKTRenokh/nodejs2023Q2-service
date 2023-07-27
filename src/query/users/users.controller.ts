import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { CreateUserDto, isCreateUserDto } from 'src/types/createUser';
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
    if (!isUUID(id)) {
      throw new HttpException('uuid is not valid', 400);
    }

    const user = this.database.getUserById(id);

    if (!user) {
      throw new HttpException('not found', 404);
    }

    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException('uuid is not valid', 400);
    }

    const isDeleted = this.database.deleteUserById(id);

    if (!isDeleted) {
      throw new HttpException('user not found', 404);
    }
  }

  @Post()
  @HttpCode(201)
  create(@Body() userDto: CreateUserDto) {
    if (!isCreateUserDto(userDto)) {
      return;
    }

    return this.database.createUser(userDto);
  }
}
