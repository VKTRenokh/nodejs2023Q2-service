import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
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

  @Post('artist/:id')
  @HttpCode(201)
  addArtist(@Param('id') id: string) {
    if (!isUUID(id)) {
      console.log('invalid id', id);
      throw new HttpException('uuid is not valid', 400);
    }

    const created = this.db.addArtistToFavs(id);

    if (!created) {
      throw new HttpException('album not found', 404);
    }

    return id;
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException('uuid is not valid', 400);
    }

    const removed = this.db.removeArtistFromFavs(id);

    if (!removed) {
      throw new HttpException('album not found', 404);
    }

    return id;
  }
}
