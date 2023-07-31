import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { create } from 'domain';
import { DatabaseService } from '../database/database.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  @HttpCode(200)
  getAll() {
    return this.db.getAllFavs();
  }

  @Post('track/:id')
  @HttpCode(201)
  addTrack(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException('uuid is not valid', 400);
    }

    const created = this.db.addTrackToFavs(id);

    if (!created) {
      throw new HttpException('track not found', 404);
    }

    return id;
  }

  @Post('album/:id')
  @HttpCode(201)
  addAlbum(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException('uuid is not valid', 400);
    }

    const created = this.db.addAlbumToFavs(id);

    if (!created) {
      throw new HttpException('album not found', 404);
    }

    return id;
  }
}
