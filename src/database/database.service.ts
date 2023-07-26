import { Injectable } from '@nestjs/common';
import { User } from '../types/user';
import * as crypto from 'crypto';

interface Db {
  users: User[];
}

@Injectable()
export class DataBaseService {
  private db: Db = {
    users: [
      {
        login: 'test_user',
        id: crypto.randomUUID(),
        version: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        password: crypto
          .createHash('sha256')
          .update(crypto.randomBytes(16))
          .digest('hex'),
      },
    ],
  };

  getUsers() {
    console.log(this.db);
    return this.db.users.map((user) => {
      return {
        name: user.login,
      };
    });
  }

  getUserById(id: string) {
    return this.db.users.find((user) => user.id === id);
  }
}
