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
import { CreateAlbumDto, isCreateAlbumDto } from 'src/types/album';
import { DatabaseService } from '../database/database.service';

@Controller('album')
export class AlbumsController {
  constructor(private readonly database: DatabaseService) {}

  @Get()
  @HttpCode(200)
  getAll() {
    return this.database.getAllAlbums();
  }

  @Get(':id')
  @HttpCode(200)
  getOne(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException('uuid is invalid', 400);
    }

    const album = this.database.getAlbumById(id);

    if (!album) {
      throw new HttpException('album not found', 404);
    }

    return album;
  }

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateAlbumDto) {
    if (!isCreateAlbumDto(dto)) {
      throw new HttpException('body doesnt contain required fields', 400);
    }

    return this.database.createAlbum(dto);
  }
}
