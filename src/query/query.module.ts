import { Module } from '@nestjs/common';
import { QueryController } from './query.controller';
import { DatabaseService } from './database/database.service';
import { UsersController } from './users/users.controller';
import { TracksController } from './tracks/tracks.controller';
import { ArtistsController } from './artists/artists.controller';
import { AlbumsController } from './albums/albums.controller';
import { FavsController } from './favs/favs.controller';

@Module({
  controllers: [QueryController, UsersController, TracksController, ArtistsController, AlbumsController, FavsController],
  providers: [DatabaseService],
})
export class QueryModule {}
