export interface CreateUserDto {
  login: string;
  password: string;
}

export const isCreateUserDto = (obj: unknown): obj is CreateUserDto => {
  return typeof obj === 'object' && obj && 'login' in obj && 'password' in obj;
};
