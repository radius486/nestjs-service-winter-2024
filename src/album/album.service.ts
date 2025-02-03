import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { CreateAlbumDto } from './dto/create-album-dto';
import { ErrorMessages } from 'src/common/constants/error-messages';
import { PrismaService } from 'src/prisma/prisma.service';

export type Album = {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
};

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async getAllAlbums() {
    return await this.prisma.album.findMany();
  }

  async getAlbumById(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new HttpException(
        ErrorMessages.recordDoestExist,
        HttpStatus.NOT_FOUND,
      );
    }

    return album;
  }

  async createAlbum(dto: CreateAlbumDto) {
    const data = {
      id: uuid.v4(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId || null,
    };

    return await this.prisma.album.create({ data });
  }

  async updateAlbumInfo(id: string, dto: CreateAlbumDto) {
    await this.getAlbumById(id);
    return await this.prisma.album.update({
      where: { id },
      data: {
        name: dto.name,
        year: dto.year,
        artistId: dto.artistId,
      },
    });
  }

  async deleteAlbumById(id: string) {
    await this.getAlbumById(id);
    await this.prisma.album.delete({ where: { id } });
  }
}
