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
  constructor(private readonly db: DatabaseService) { }

  @Get()
  @HttpCode(200)
  async getAll() {
    return await this.db.getAllFavs();
  }

  @Post('track/:id')
  @HttpCode(201)
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const created = await this.db.addTrackToFavs(id);

    if (!created) {
      throw new HttpException('track not found', 422);
    }

    return created;
  }

  @Post('album/:id')
  @HttpCode(201)
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const created = await this.db.addAlbumToFavs(id);

    if (!created) {
      throw new HttpException('album not found', 422);
    }

    return created;
  }

  @Post('artist/:id')
  @HttpCode(201)
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const created = await this.db.addArtistToFavs(id);

    if (!created) {
      throw new HttpException('album not found', 422);
    }

    return created;
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const removed = await this.db.removeArtistFromFavs(id);

    if (!removed) {
      throw new HttpException('album not found', 422);
    }

    return id;
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const removed = await this.db.removeTrackFromFavs(id);

    if (!removed) {
      throw new HttpException('album not found', 404);
    }
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const removed = await this.db.removeAlbumFromFavs(id);

    if (!removed) {
      throw new HttpException('album not found', 404);
    }
  }
}
