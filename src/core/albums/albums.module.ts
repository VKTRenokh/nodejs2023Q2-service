import { Module } from '@nestjs/common';
import { AlbumsController } from './albums/albums.controller';

@Module({
  controllers: [AlbumsController],
})
export class AlbumsModule {}
