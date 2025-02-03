import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Album, AlbumService } from 'src/album/album.service';
import { Artist, ArtistService } from 'src/artist/artist.service';
import { Track, TrackService } from 'src/track/track.service';
import { ErrorMessages } from 'src/common/constants/error-messages';
import { PrismaService } from 'src/prisma/prisma.service';
import { PRISMA_ERROR_CODES } from 'src/common/constants/prisma-codes';

export type Favorites = {
  artists: string[];
  albums: string[];
  tracks: string[];
};

@Injectable()
export class FavoritesService {
  constructor(
    private artistService: ArtistService,
    private albumService: AlbumService,
    private trackService: TrackService,
    private prisma: PrismaService,
  ) {}

  async getAllFavorites() {
    const albumResponse = await this.prisma.favoriteAlbums.findMany({
      select: { album: true },
    });

    const artistResponse = await this.prisma.favoriteArtists.findMany({
      select: { artist: true },
    });

    const trackResponse = await this.prisma.favoriteTracks.findMany({
      select: { track: true },
    });

    const albums = albumResponse.map((instance) => instance.album);
    const artists = artistResponse.map((instance) => instance.artist);
    const tracks = trackResponse.map((instance) => instance.track);

    return { albums, artists, tracks };
  }

  async addTrackToFavorites(id: string) {
    let track: Track;

    try {
      track = await this.trackService.getTrackById(id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        ErrorMessages.recordDoestExist,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    try {
      await this.prisma.favoriteTracks.create({ data: { trackId: id } });
    } catch (error) {
      if (error.code === PRISMA_ERROR_CODES.UNIQUE_CONSTRAINT_FAILED) {
        throw new HttpException(
          `track ${ErrorMessages.isAlreadyInFavorites}`,
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(
          ErrorMessages.somethingWentWrong,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    return track;
  }

  async removeTrackFromFavorites(id: string) {
    try {
      await this.prisma.favoriteTracks.delete({ where: { trackId: id } });
    } catch (error) {
      if (error.code === PRISMA_ERROR_CODES.RECORD_NOT_FOUND) {
        throw new HttpException(
          `track ${ErrorMessages.notFoundInFavorites}`,
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw new HttpException(
          ErrorMessages.somethingWentWrong,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async addAlbumToFavorites(id: string) {
    let album: Album;

    try {
      album = await this.albumService.getAlbumById(id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        ErrorMessages.recordDoestExist,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    try {
      await this.prisma.favoriteAlbums.create({ data: { albumId: id } });
    } catch (error) {
      if (error.code === PRISMA_ERROR_CODES.UNIQUE_CONSTRAINT_FAILED) {
        throw new HttpException(
          `album ${ErrorMessages.isAlreadyInFavorites}`,
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(
          ErrorMessages.somethingWentWrong,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    return album;
  }

  async removeAlbumFromFavorites(id: string) {
    try {
      await this.prisma.favoriteAlbums.delete({ where: { albumId: id } });
    } catch (error) {
      if (error.code === PRISMA_ERROR_CODES.RECORD_NOT_FOUND) {
        throw new HttpException(
          `album ${ErrorMessages.notFoundInFavorites}`,
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw new HttpException(
          ErrorMessages.somethingWentWrong,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async addArtistToFavorites(id: string) {
    let artist: Artist;

    try {
      artist = await this.artistService.getArtistById(id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        ErrorMessages.recordDoestExist,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    try {
      await this.prisma.favoriteArtists.create({ data: { artistId: id } });
    } catch (error) {
      if (error.code === PRISMA_ERROR_CODES.UNIQUE_CONSTRAINT_FAILED) {
        throw new HttpException(
          `artist ${ErrorMessages.isAlreadyInFavorites}`,
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(
          ErrorMessages.somethingWentWrong,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    return artist;
  }

  async removeArtistFromFavorites(id: string) {
    try {
      await this.prisma.favoriteArtists.delete({ where: { artistId: id } });
    } catch (error) {
      if (error.code === PRISMA_ERROR_CODES.RECORD_NOT_FOUND) {
        throw new HttpException(
          `artist ${ErrorMessages.notFoundInFavorites}`,
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw new HttpException(
          ErrorMessages.somethingWentWrong,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
