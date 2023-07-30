import { Controller, Get, HttpCode } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Controller('album')
export class AlbumsController {
  constructor(private readonly database: DatabaseService) {}

  @Get()
  @HttpCode(200)
  getAll() {
    return this.database.getAllAlbums();
  }
}
