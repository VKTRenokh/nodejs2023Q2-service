import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { Db } from 'src/types/db';
import { User } from 'src/types/user';

@Injectable()
export class DatabaseService {
  private db: Db = {
    users: [
      {
        id: crypto.randomUUID(),
        login: crypto.randomBytes(16).toString('hex'),
        version: 0,
        password: crypto
          .createHash('sha256')
          .update(crypto.randomBytes(32))
          .digest('hex'),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ],
  };

  parseUser(user: User) {
    return {
      login: user.login,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      version: user.version,
      id: user.id,
    };
  }

  getAllUsers() {
    return this.db.users.map((user) => {
      return this.parseUser(user);
    });
  }

  getUserById(id: string) {
    const user = this.db.users.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    return this.parseUser(user);
  }
}
