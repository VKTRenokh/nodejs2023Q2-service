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
import { CreateArtistDto, isCreateArtistDto } from 'src/types/createArtist';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  @HttpCode(200)
  getAll() {
    return this.databaseService.getAllArtists();
  }

  @Get(':id')
  @HttpCode(200)
  getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = this.databaseService.getArtistById(id);

    if (!user) {
      throw new HttpException('artist not found', 404);
    }

    return user;
  }

  @Post()
  @HttpCode(201)
  createOne(@Body() dto: CreateArtistDto) {
    if (!isCreateArtistDto(dto)) {
      throw new HttpException('body does not contain required fields', 400);
    }

    return this.databaseService.createArtist(dto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const deleted = this.databaseService.deleteArtist(id);

    if (!deleted) {
      throw new HttpException('artist not found', 404);
    }
  }

  @Put(':id')
  @HttpCode(200)
  updateOne(
    @Body() dto: CreateArtistDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    if (!isCreateArtistDto(dto)) {
      throw new HttpException('user dto is invalid', 400);
    }

    const updated = this.databaseService.updateArtist(id, dto);

    if (!updated) {
      throw new HttpException('artist not found', 404);
    }

    return updated;
  }
}
