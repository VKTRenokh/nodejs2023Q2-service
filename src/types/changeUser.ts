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
    'oldPassword' in data &&
    'newPassword' in data
  );
};
