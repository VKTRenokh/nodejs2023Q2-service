import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { Db } from 'src/types/db';

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

  getAllUsers() {
    return this.db.users.map((user) => {
      return {
        login: user.login,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        version: user.version,
        id: user.id,
      };
    });
  }
}
