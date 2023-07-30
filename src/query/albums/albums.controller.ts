import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  Param,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
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
}
