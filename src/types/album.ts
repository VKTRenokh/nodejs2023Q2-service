import { CreateArtistDto } from './createArtist';

export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export interface CreateAlbumDto {
  name: string;
  year: number;
  artistId: string | null;
}

export const isCreateAlbumDto = (obj: unknown): obj is CreateArtistDto => {
  return (
    typeof obj === 'object' &&
    obj &&
    typeof obj['name'] === 'string' &&
    (obj['artistId'] === null || typeof obj['artistId'] === 'string') &&
    typeof obj['year'] === 'number'
  );
};
