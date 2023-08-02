import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { DatabaseService } from 'src/shared/database/database.service';

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
  addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const created = this.db.addTrackToFavs(id);

    if (!created) {
      throw new HttpException('track not found', 422);
    }

    return id;
  }

  @Post('album/:id')
  @HttpCode(201)
  addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const created = this.db.addAlbumToFavs(id);

    if (!created) {
      throw new HttpException('album not found', 422);
    }

    return id;
  }

  @Post('artist/:id')
  @HttpCode(201)
  addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const created = this.db.addArtistToFavs(id);

    if (!created) {
      throw new HttpException('album not found', 422);
    }

    return id;
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const removed = this.db.removeArtistFromFavs(id);

    if (!removed) {
      throw new HttpException('album not found', 422);
    }

    return id;
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const removed = this.db.removeTrackFromFavs(id);

    if (!removed) {
      throw new HttpException('album not found', 404);
    }
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const removed = this.db.removeAlbumFromFavs(id);

    if (!removed) {
      throw new HttpException('album not found', 404);
    }
  }
}
