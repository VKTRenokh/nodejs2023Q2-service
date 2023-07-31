import {
  Controller,
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

    return id;
  }
}
