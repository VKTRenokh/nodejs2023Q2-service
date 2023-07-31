import { Module } from '@nestjs/common';
import { ArtistsController } from './artists/artists.controller';

@Module({
  controllers: [ArtistsController],
})
export class ArtistsModule {}
