import { Controller, Get, HttpCode } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Controller('track')
export class TracksController {
  constructor(private readonly dataBaseService: DatabaseService) {}

  @Get()
  @HttpCode(200)
  getAll() {
    return this.dataBaseService.getAllTracks();
  }
}
