import { Controller, Get, HttpCode } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  @HttpCode(200)
  getAll() {
    return this.databaseService.getAllArtists();
  }
}
