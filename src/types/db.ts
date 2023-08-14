import { Album } from './album';
import { Artist } from './artist';
import { Favs } from './favs';
import { Track } from './track';
import { User } from './user';

export interface Db {
  users: User[];
  tracks: Track[];
  artists: Artist[];
  albums: Album[];
  favs: Favs;
}
