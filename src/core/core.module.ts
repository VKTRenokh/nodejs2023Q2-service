import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/shared/database/database.service';
import { SharedModule } from 'src/shared/shared.module';
import { AlbumsModule } from './albums/albums.module';
import { ArtistsModule } from './artists/artists.module';
import { FavsModule } from './favs/favs.module';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    TracksModule,
    ArtistsModule,
    AlbumsModule,
    FavsModule,
    SharedModule,
  ],
  providers: [DatabaseService],
})
export class CoreModule { }
