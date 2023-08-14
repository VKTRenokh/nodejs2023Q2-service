export interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export interface TrackCreateDto {
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export const isTrackCreateDto = (obj: unknown): obj is TrackCreateDto => {
  return (
    typeof obj === 'object' &&
    obj &&
    typeof obj['name'] === 'string' &&
    (typeof obj['artistId'] === 'string' || obj['artistId'] === null) &&
    (typeof obj['albumId'] === 'string' || obj['albumId'] === null) &&
    typeof obj['duration'] === 'number'
  );
};
