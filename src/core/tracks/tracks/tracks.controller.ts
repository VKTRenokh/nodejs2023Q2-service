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
  constructor(private readonly dataBaseService: DatabaseService) {}

  @Get()
  @HttpCode(200)
  getAll() {
    return this.dataBaseService.getAllTracks();
  }

  @Get(':id')
  @HttpCode(200)
  getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = this.dataBaseService.getTrackById(id);

    if (!track) {
      throw new HttpException('track not found', 404);
    }

    return track;
  }

  @Delete(':id')
  @HttpCode(204)
  deleteOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const deleted = this.dataBaseService.deleteTrackById(id);

    if (!deleted) {
      throw new HttpException('track not found', 404);
    }

    return deleted;
  }

  @Post()
  @HttpCode(201)
  create(@Body() dto: TrackCreateDto) {
    if (!isTrackCreateDto(dto)) {
      throw new HttpException('body does not contain required fields', 400);
    }

    return this.dataBaseService.createTrack(dto);
  }

  @Put(':id')
  @HttpCode(200)
  update(
    @Body() dto: TrackCreateDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    if (!isTrackCreateDto(dto)) {
      throw new HttpException('body does not contain required fields', 400);
    }

    const updated = this.dataBaseService.updateTrack(id, dto);

    if (!updated) {
      throw new HttpException('track not found', 404);
    }

    return updated;
  }
}
