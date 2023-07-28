import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import {
  isUserUpdatePasswordDto,
  UpdatePasswordDto,
} from 'src/types/changeUser';
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
      console.log('delete id is invalid', id);
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

  @Put(':id')
  @HttpCode(200)
  change(
    @Body() changeUserPasswordDto: UpdatePasswordDto,
    @Param('id') id: string,
  ) {
    if (!isUUID(id)) {
      throw new HttpException('user id is invalid', 400);
    }

    if (!isUserUpdatePasswordDto(changeUserPasswordDto)) {
      throw new HttpException('body doesnt contains required fields', 400);
    }

    if (!this.database.getUserById(id)) {
      throw new HttpException('user not found', 404);
    }

    const user = this.database.updateUser(id, changeUserPasswordDto);

    if (!user) {
      throw new HttpException('old password is not valid', 403);
    }

    return user;
  }
}
