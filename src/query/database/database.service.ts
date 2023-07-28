import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { UpdatePasswordDto } from 'src/types/changeUser';
import { CreateUserDto } from 'src/types/createUser';
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
    tracks: [
      {
        id: crypto.randomUUID(),
        name: crypto.randomBytes(16).toString('base64'),
        duration: crypto.randomInt(20, 120),
        artistId: null,
        albumId: null,
      },
    ],
    artists: [
      {
        id: crypto.randomUUID(),
        name: crypto.randomBytes(16).toString('base64'),
        grammy: false,
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

  deleteUserById(id: string) {
    const userIndex = this.db.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return false;
    }

    this.db.users.splice(userIndex, 1);
    return true;
  }

  createUser(userDto: CreateUserDto) {
    console.log('userDto', userDto);

    const user = {
      login: userDto.login,
      password: crypto
        .createHash('sha256')
        .update(userDto.password)
        .digest('base64'),
      id: crypto.randomUUID(),
      version: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.db.users.push(user);

    console.log(this.db.users);

    return user;
  }

  updateUser(id: string, dto: UpdatePasswordDto) {
    const userIndex = this.db.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return;
    }

    if (
      crypto.createHash('sha256').update(dto.oldPassword).digest('base64') !==
      this.db.users[userIndex].password
    ) {
      return;
    }

    this.db.users[userIndex].password = crypto
      .createHash('sha256')
      .update(dto.newPassword)
      .digest('base64');

    this.db.users[userIndex].version++;

    return this.db.users[userIndex];
  }

  getAllTracks() {
    return this.db.tracks;
  }
}
