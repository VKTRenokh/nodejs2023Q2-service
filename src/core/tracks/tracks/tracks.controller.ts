import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { DatabaseService } from 'src/shared/database/database.service';
import { isTrackCreateDto, TrackCreateDto } from 'src/types/track';

@Controller('track')
export class TracksController {
  constructor(private readonly dataBaseService: DatabaseService) { }

  @Get()
  @HttpCode(200)
  async getAll() {
    return await this.dataBaseService.getAllTracks();
  }

  @Get(':id')
  @HttpCode(200)
  async getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.dataBaseService.getTrackById(id);

    if (!track) {
      throw new HttpException('track not found', 404);
    }

    return track;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const deleted = await this.dataBaseService.deleteTrackById(id);

    if (!deleted) {
      throw new HttpException('track not found', 404);
    }

    return deleted;
  }

  @Post()
  @HttpCode(201)
  async create(@Body() dto: TrackCreateDto) {
    if (!isTrackCreateDto(dto)) {
      throw new HttpException('body does not contain required fields', 400);
    }

    return await this.dataBaseService.createTrack(dto);
  }

  @Put(':id')
  @HttpCode(200)
  async update(
    @Body() dto: TrackCreateDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    if (!isTrackCreateDto(dto)) {
      throw new HttpException('body does not contain required fields', 400);
    }

    const updated = await this.dataBaseService.updateTrack(id, dto);

    if (!updated) {
      throw new HttpException('track not found', 404);
    }

    return updated;
  }
}
