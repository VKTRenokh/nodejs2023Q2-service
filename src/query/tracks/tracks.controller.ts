import { Controller, Get, HttpCode, HttpException, Param } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { DatabaseService } from '../database/database.service';

@Controller('track')
export class TracksController {
  constructor(private readonly dataBaseService: DatabaseService) { }

  @Get()
  @HttpCode(200)
  getAll() {
    return this.dataBaseService.getAllTracks();
  }

  @Get(':id')
  @HttpCode(200)
  getOne(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException('user id is invalid', 400)
    }

    const track = this.dataBaseService.getTrackById(id)

    if (!track) {
      throw new HttpException('track not found', 404)
    }

    return track
  }
}
