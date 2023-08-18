import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';
import { CreateAlbumDto } from 'src/types/album';
import { UpdatePasswordDto } from 'src/types/changeUser';
import { CreateArtistDto } from 'src/types/createArtist';
import { CreateUserDto } from 'src/types/createUser';
import { TrackCreateDto } from 'src/types/track';
import { User } from 'src/types/user';
import { genSalt, hash } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {

  private db: PrismaClient = new PrismaClient();

  constructor(private configService: ConfigService) { console.log('kakoi nahui empty') }

  parseUser(user: User) {
    return {
      login: user.login,
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.updatedAt).getTime(),
      version: user.version,
      id: user.id,
    };
  }

  async getAllUsers() {
    const users = await this.db.user.findMany();

    return users.map((user) => {
      return this.parseUser(user);
    });
  }

  async getUserById(id: string) {
    const user = await this.db.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return this.parseUser(user);
  }

  async getUserByName(login: string) {
    const user = await this.db.user.findFirst({
      where: {
        login,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async deleteUserById(id: string) {
    if (!await this.db.user.findUnique({
      where: {
        id
      }
    })) {
      return
    }

    return await this.db.user.delete({
      where: {
        id,
      },
    })
  }

  async createUser(userDto: CreateUserDto) {
    const now = new Date()

    console.log('pes')

    const cryptSalt = +this.configService.get('CRYPT_SALT')
    console.log('pes')
    const salt = await genSalt(10)

    // const crypted = await bcrypt.hash(userDto.password, await bcrypt.genSalt(+this.configService.get("CRYPT_SALT")))

    return this.parseUser(await this.db.user.create({
      data: {
        login: userDto.login,
        updatedAt: now,
        createdAt: now,
        password: 'popa'
      },
    }));
  }

  async updateUser(id: string, dto: UpdatePasswordDto) {
    try {
      return this.parseUser(await this.db.user.update({
        where: {
          id,
          password: crypto
            .createHash('sha256')
            .update(dto.oldPassword)
            .digest('base64'),
        },
        data: {
          version: {
            increment: 1
          },
          updatedAt: new Date(),
          password: crypto
            .createHash('sha256')
            .update(dto.newPassword)
            .digest('base64'),
        },
      }));
    } catch (e) {
      return false
    }
  }

  async getAllTracks() {
    return await this.db.track.findMany();
  }

  async getTrackById(id: string) {
    return await this.db.track.findUnique({
      where: {
        id,
      },
    });
  }

  async deleteTrackById(id: string) {
    if (!await this.db.track.findUnique({
      where: {
        id
      }
    })) {
      return
    }

    return await this.db.track.delete({
      where: {
        id,
      },
    }).catch();
  }

  async createTrack(dto: TrackCreateDto) {
    return await this.db.track.create({
      data: dto,
    });
  }

  async updateTrack(id: string, dto: TrackCreateDto) {
    if (!await this.db.track.findUnique({
      where: {
        id
      }
    })) {
      return
    }

    return await this.db.track.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async getAllArtists() {
    return await this.db.artist.findMany();
  }

  async getArtistById(id: string) {
    return await this.db.artist.findUnique({
      where: {
        id,
      },
    });
  }

  async createArtist(dto: CreateArtistDto) {
    return await this.db.artist.create({
      data: dto,
    });
  }

  async deleteArtist(id: string) {
    try {
      await this.db.artist.delete({
        where: {
          id,
        },
      });

      await this.db.track.updateMany({
        where: {
          artistId: id,
        },
        data: {
          artistId: null,
        },
      });

      await this.db.album.updateMany({
        where: {
          artistId: id
        },
        data: {
          artistId: null
        },
      })
      return true;
    } catch (e) {
      return false
    }
  }

  async updateArtist(id: string, dto: CreateArtistDto) {
    if (!await this.db.artist.findUnique({
      where: {
        id
      }
    })) {
      return
    }

    return await this.db.artist.update({
      where: {
        id
      },
      data: dto
    })
  }

  async getAllAlbums() {
    return await this.db.album.findMany()
  }

  async getAlbumById(id: string) {
    return await this.db.album.findUnique({
      where: {
        id
      }
    })
  }

  async createAlbum(dto: CreateAlbumDto) {
    return await this.db.album.create({
      data: dto
    })
  }

  async updateAlbum(id: string, dto: CreateAlbumDto) {
    if (!await this.db.album.findUnique({
      where: {
        id
      }
    })) {
      return
    }

    return await this.db.album.update({
      where: {
        id
      },
      data: dto,
    })
  }

  async deleteAlbum(id: string) {
    if (!await this.db.album.findUnique({
      where: {
        id
      }
    })) {
      return
    }

    await this.db.album.delete({
      where: {
        id
      }
    })

    await this.db.track.updateMany({
      where: {
        albumId: id,
      },
      data: {
        albumId: null,
      },
    })

    return true;
  }

  async getFavTracks() {
    const favs = await this.db.favTrack.findMany()

    const tracks = await Promise.all(
      favs.map(({ id }) => {
        return this.getTrackById(id)
      })
    )

    return tracks.filter(Boolean)
  }

  async getFavAlbums() {
    const favs = await this.db.favAlbum.findMany()

    const albums = await Promise.all(
      favs.map(({ id }) => {
        return this.getAlbumById(id)
      })
    )

    return albums.filter(Boolean)
  }

  async getFavArtists() {
    const favs = await this.db.favArtist.findMany()

    const artists = await Promise.all(
      favs.map(({ id }) => {
        return this.getArtistById(id)
      })
    )

    return artists.filter(Boolean)
  }

  async getAllFavs() {
    return {
      tracks: await this.getFavTracks(),
      albums: await this.getFavAlbums(),
      artists: await this.getFavArtists(),
    };
  }

  async addTrackToFavs(id: string) {
    const track = await this.getTrackById(id);

    if (!track) {
      return;
    }

    await this.db.favTrack.create({
      data: {
        id
      }
    });

    return await this.getTrackById(id);
  }

  async addAlbumToFavs(id: string) {
    const album = await this.getAlbumById(id);

    if (!album) {
      return;
    }

    await this.db.favAlbum.create({
      data: {
        id
      }
    });

    return await this.getAlbumById(id);
  }

  async addArtistToFavs(id: string) {
    const artist = await this.getArtistById(id);

    if (!artist) {
      return;
    }

    await this.db.favArtist.create({
      data: {
        id
      }
    });

    return await this.getArtistById(id);
  }

  async removeArtistFromFavs(id: string) {
    try {
      return await this.db.favArtist.delete({
        where: {
          id
        },
      })
    } catch (e) {
      return false
    }
  }

  async removeAlbumFromFavs(id: string) {
    try {
      return await this.db.favAlbum.delete({
        where: {
          id
        }
      })
    } catch (e) {
      return false
    }
  }

  async removeTrackFromFavs(id: string) {
    try {
      return await this.db.favTrack.delete({
        where: {
          id
        },
      })
    } catch (e) {
      return false
    }
  }
}
