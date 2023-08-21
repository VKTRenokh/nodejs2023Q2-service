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
  constructor(private readonly databaseService: DatabaseService) { }

  @Get()
  @HttpCode(200)
  async getAll() {
    return await this.databaseService.getAllArtists();
  }

  @Get(':id')
  @HttpCode(200)
  async getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.databaseService.getArtistById(id);

    if (!user) {
      throw new HttpException('artist not found', 404);
    }

    return user;
  }

  @Post()
  @HttpCode(201)
  async createOne(@Body() dto: CreateArtistDto) {
    if (!isCreateArtistDto(dto)) {
      throw new HttpException('body does not contain required fields', 400);
    }

    return await this.databaseService.createArtist(dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const deleted = await this.databaseService.deleteArtist(id);

    if (!deleted) {
      throw new HttpException('artist not found', 404);
    }
  }

  @Put(':id')
  @HttpCode(200)
  async updateOne(
    @Body() dto: CreateArtistDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    if (!isCreateArtistDto(dto)) {
      throw new HttpException('user dto is invalid', 400);
    }

    const updated = await this.databaseService.updateArtist(id, dto);

    if (!updated) {
      throw new HttpException('artist not found', 404);
    }

    return updated;
  }
}
