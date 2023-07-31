import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { CreateAlbumDto } from 'src/types/album';
import { UpdatePasswordDto } from 'src/types/changeUser';
import { CreateArtistDto } from 'src/types/createArtist';
import { CreateUserDto } from 'src/types/createUser';
import { Db } from 'src/types/db';
import { Track, TrackCreateDto } from 'src/types/track';
import { User } from 'src/types/user';

@Injectable()
export class DatabaseService {
  private db: Db = {
    users: [
      {
        id: crypto.randomUUID(),
        login: crypto.randomBytes(16).toString('hex'),
        version: 1,
        password: crypto
          .createHash('sha256')
          .update(crypto.randomBytes(32))
          .digest('base64'),
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
    albums: [
      {
        id: crypto.randomUUID(),
        name: 'name',
        year: 1947,
        artistId: null,
      },
    ],
    favs: {
      tracks: [],
      albums: [],
      artists: [],
    },
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
    const user = {
      login: userDto.login,
      password: crypto
        .createHash('sha256')
        .update(userDto.password)
        .digest('base64'),
      id: crypto.randomUUID(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.db.users.push(user);

    return this.parseUser(user);
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
    this.db.users[userIndex].updatedAt = Date.now();

    return this.parseUser(this.db.users[userIndex]);
  }

  getAllTracks() {
    return this.db.tracks;
  }

  getTrackById(id: string) {
    return this.db.tracks.find((track) => track.id === id);
  }

  deleteTrackById(id: string) {
    const trackIndex = this.db.tracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      return false;
    }

    this.db.tracks.splice(trackIndex, 1);
    return true;
  }

  createTrack(dto: TrackCreateDto) {
    const newTrack: Track = { ...dto, id: crypto.randomUUID() };

    this.db.tracks.push(newTrack);

    return newTrack;
  }

  updateTrack(id: string, dto: TrackCreateDto) {
    const trackIndex = this.db.tracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      return;
    }

    this.db.tracks[trackIndex] = { ...this.db.tracks[trackIndex], ...dto };

    return this.db.tracks[trackIndex];
  }

  getAllArtists() {
    return this.db.artists;
  }

  getArtistById(id: string) {
    return this.db.artists.find((artist) => artist.id === id);
  }

  createArtist(dto: CreateArtistDto) {
    const artist = { ...dto, id: crypto.randomUUID() };

    this.db.artists.push(artist);

    return artist;
  }

  deleteArtist(id: string) {
    const artistIndex = this.db.artists.findIndex((artist) => artist.id === id);

    if (artistIndex === -1) {
      return false;
    }

    this.db.tracks = this.db.tracks.map((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
      return track;
    });

    this.db.albums = this.db.albums.map((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
      return track;
    });

    this.db.artists.splice(artistIndex, 1);

    return true;
  }

  updateArtist(id: string, dto: CreateArtistDto) {
    const artistIndex = this.db.artists.findIndex((artist) => artist.id === id);

    if (artistIndex === -1) {
      return;
    }

    this.db.artists[artistIndex] = { ...dto, id };

    return this.db.artists[artistIndex];
  }

  getAllAlbums() {
    return this.db.albums;
  }

  getAlbumById(id: string) {
    return this.db.albums.find((album) => album.id === id);
  }

  createAlbum(dto: CreateAlbumDto) {
    const album = { ...dto, id: crypto.randomUUID() };

    this.db.albums.push(album);

    return album;
  }

  updateAlbum(id: string, dto: CreateAlbumDto) {
    const albumIndex = this.db.albums.findIndex((album) => album.id === id);

    if (albumIndex === -1) {
      return;
    }

    this.db.albums[albumIndex] = { ...dto, id };

    return this.db.albums[albumIndex];
  }

  deleteAlbum(id: string) {
    const albumIndex = this.db.albums.findIndex((album) => album.id === id);

    if (albumIndex === -1) {
      return false;
    }

    this.db.tracks = this.db.tracks.map((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
      return track;
    });

    this.db.albums.splice(albumIndex, 1);

    return true;
  }

  getFavTracks() {
    return this.db.favs.tracks.map((id) => {
      return this.getTrackById(id);
    });
  }

  getFavAlbums() {
    return this.db.favs.albums.map((id) => {
      return this.getAlbumById(id);
    });
  }

  getFavArtists() {
    return this.db.favs.artists.map((id) => {
      return this.getArtistById(id);
    });
  }

  getAllFavs() {
    return {
      tracks: this.getFavTracks(),
      albums: this.getFavAlbums(),
      artists: this.getFavArtists(),
    };
  }

  addTrackToFavs(id: string) {
    const track = this.getTrackById(id);

    if (!track) {
      return;
    }

    this.db.favs.tracks.push(id);

    return id;
  }

  addAlbumToFavs(id: string) {
    const album = this.getAlbumById(id);

    if (!album) {
      return;
    }

    this.db.favs.albums.push(id);

    return id;
  }
}
