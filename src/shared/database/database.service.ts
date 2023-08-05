import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';
import { CreateAlbumDto } from 'src/types/album';
import { UpdatePasswordDto } from 'src/types/changeUser';
import { CreateArtistDto } from 'src/types/createArtist';
import { CreateUserDto } from 'src/types/createUser';
import { Track, TrackCreateDto } from 'src/types/track';
import { User } from 'src/types/user';

@Injectable()
export class DatabaseService {
  private db: PrismaClient = new PrismaClient();

  parseUser(user: User) {
    return {
      login: user.login,
      createdAt: user.createdAt,
      updatedAt: new Date(user.updatedAt).getSeconds(),
      version: new Date(user.createdAt).getSeconds(),
      id: user.id,
    };
  }

  async getAllUsers() {
    const users = await this.db.user.findMany();

    return users.map((user) => {
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
    return this.db.favs.tracks
      .map((id) => {
        return this.getTrackById(id);
      })
      .filter(Boolean);
  }

  getFavAlbums() {
    return this.db.favs.albums
      .map((id) => {
        return this.getAlbumById(id);
      })
      .filter(Boolean);
  }

  getFavArtists() {
    return this.db.favs.artists
      .map((id) => {
        return this.getArtistById(id);
      })
      .filter(Boolean);
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

  addArtistToFavs(id: string) {
    const artist = this.getArtistById(id);

    if (!artist) {
      return;
    }

    this.db.favs.artists.push(id);

    return id;
  }

  removeArtistFromFavs(id: string) {
    const artistIndex = this.db.favs.artists.findIndex(
      (artist) => artist === id,
    );

    if (!artistIndex) {
      return false;
    }

    this.db.favs.artists.splice(artistIndex, 1);

    return true;
  }

  removeAlbumFromFavs(id: string) {
    const albumIndex = this.db.favs.albums.findIndex((artist) => artist === id);

    if (!albumIndex) {
      return false;
    }

    this.db.favs.albums.splice(albumIndex, 1);

    return true;
  }

  removeTrackFromFavs(id: string) {
    const trackIndex = this.db.favs.tracks.findIndex((artist) => artist === id);

    if (!trackIndex) {
      return false;
    }

    this.db.favs.tracks.splice(trackIndex, 1);

    return true;
  }
}
