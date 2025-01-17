import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Album, AlbumService } from 'src/album/album.service';
import { Artist, ArtistService } from 'src/artist/artist.service';
import { Track, TrackService } from 'src/track/track.service';
import { ErrorMessages } from 'src/common/constants/error-messages';
import { PrismaService } from 'src/prisma/prisma.service';
import { PRISMA_ERROR_CODES } from 'src/common/constants/prisma-codes';
import { INSTANCE_TYPES } from 'src/common/constants/common';

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
    const [albumResponse, artistResponse, trackResponse] = await Promise.all([
      this.prisma.favoriteAlbums.findMany({
        select: { album: true },
      }),
      this.prisma.favoriteArtists.findMany({
        select: { artist: true },
      }),
      this.prisma.favoriteTracks.findMany({
        select: { track: true },
      }),
    ]);

    const albums = albumResponse.map((instance) => instance.album);
    const artists = artistResponse.map((instance) => instance.artist);
    const tracks = trackResponse.map((instance) => instance.track);

    return { albums, artists, tracks };
  }

  async addInstanceToFavorites(instanceType: INSTANCE_TYPES, id: string) {
    try {
      switch (instanceType) {
        case INSTANCE_TYPES.TRACK:
          const track: Track = await this.trackService.getTrackById(id);
          await this.prisma.favoriteTracks.create({ data: { trackId: id } });
          return track;
        case INSTANCE_TYPES.ALBUM:
          const album: Album = await this.albumService.getAlbumById(id);
          await this.prisma.favoriteAlbums.create({ data: { albumId: id } });
          return album;
        case INSTANCE_TYPES.ARTIST:
          const artist: Artist = await this.artistService.getArtistById(id);
          await this.prisma.favoriteArtists.create({ data: { artistId: id } });
          return artist;
        default:
          throw new Error();
      }
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw new HttpException(
          ErrorMessages.recordDoestExist,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      } else if (error.code === PRISMA_ERROR_CODES.UNIQUE_CONSTRAINT_FAILED) {
        throw new HttpException(
          `${instanceType} ${ErrorMessages.isAlreadyInFavorites}`,
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(
          ErrorMessages.somethingWentWrong,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async removeInstanceFromFavorites(instanceType: INSTANCE_TYPES, id: string) {
    try {
      switch (instanceType) {
        case INSTANCE_TYPES.TRACK:
          await this.prisma.favoriteTracks.delete({ where: { trackId: id } });
          break;
        case INSTANCE_TYPES.ALBUM:
          await this.prisma.favoriteAlbums.delete({ where: { albumId: id } });
          break;
        case INSTANCE_TYPES.ARTIST:
          await this.prisma.favoriteArtists.delete({ where: { artistId: id } });
          break;
        default:
          throw new Error();
      }
    } catch (error) {
      if (error.code === PRISMA_ERROR_CODES.RECORD_NOT_FOUND) {
        throw new HttpException(
          `${instanceType} ${ErrorMessages.notFoundInFavorites}`,
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
