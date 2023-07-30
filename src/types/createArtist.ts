export interface CreateArtistDto {
  name: string;
  grammy: boolean;
}

export const isCreateArtistDto = (dto: unknown): dto is CreateArtistDto => {
  return (
    typeof dto === 'object' &&
    dto &&
    typeof dto['name'] === 'string' &&
    typeof dto['grammy'] === 'boolean'
  );
};
