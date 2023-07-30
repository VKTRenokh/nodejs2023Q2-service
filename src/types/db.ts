import { Album } from './album';
import { Artist } from './artist';
import { Track } from './track';
import { User } from './user';

export interface Db {
  users: User[];
  tracks: Track[];
  artists: Artist[];
  albums: Album[];
}
