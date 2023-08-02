import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { DatabaseService } from 'src/shared/database/database.service';
import {
  isUserUpdatePasswordDto,
  UpdatePasswordDto,
} from 'src/types/changeUser';
import { CreateUserDto, isCreateUserDto } from 'src/types/createUser';

@Controller('user')
export class UsersController {
  constructor(private readonly database: DatabaseService) {}

  @Get()
  getAll() {
    return this.database.getAllUsers();
  }

  @Get(':id')
  @HttpCode(200)
  get(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = this.database.getUserById(id);

    if (!user) {
      throw new HttpException('not found', 404);
    }

    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const isDeleted = this.database.deleteUserById(id);

    if (!isDeleted) {
      throw new HttpException('user not found', 404);
    }
  }

  @Post()
  @HttpCode(201)
  create(@Body() userDto: CreateUserDto) {
    if (!isCreateUserDto(userDto)) {
      throw new HttpException('userDto is invalid', 400);
    }

    return this.database.createUser(userDto);
  }

  @Put(':id')
  @HttpCode(200)
  change(
    @Body() changeUserPasswordDto: UpdatePasswordDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
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
