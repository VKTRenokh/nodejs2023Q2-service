export interface UpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export const isUserUpdatePasswordDto = (
  data: unknown,
): data is UpdatePasswordDto => {
  return (
    typeof data === 'object' &&
    data &&
    typeof data['oldPassword'] === 'string' &&
    typeof data['newPassword'] === 'string'
  );
};
