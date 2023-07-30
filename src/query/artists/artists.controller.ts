import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { isCreateArtistDto } from 'src/types/createArtist';
import { DatabaseService } from '../database/database.service';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  @HttpCode(200)
  getAll() {
    return this.databaseService.getAllArtists();
  }

  @Get('id')
  @HttpCode(200)
  getOne(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException('uuid is not valid', 400);
    }

    const user = this.databaseService.getArtistById(id);

    if (!user) {
      throw new HttpException('artist not found', 404);
    }

    return user;
  }

  @Post()
  @HttpCode(201)
  createOne(@Body() dto: any) {
    if (!isCreateArtistDto(dto)) {
      throw new HttpException('body does not contain required fields', 400);
    }

    return this.databaseService.createArtist(dto);
  }
}
