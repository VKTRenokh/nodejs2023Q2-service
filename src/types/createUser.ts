export interface CreateUserDto {
  login: string;
  password: string;
}

export const isCreateUserDto = (obj: unknown): obj is CreateUserDto => {
  return (
    typeof obj === 'object' &&
    obj &&
    typeof obj['login'] === 'string' &&
    typeof obj['password'] === 'string'
  );
};
