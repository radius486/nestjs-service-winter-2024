import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { CreateArtistDto } from './dto/create-artist-dto';
import { ErrorMessages } from 'src/common/constants/error-messages';
import { PrismaService } from 'src/prisma/prisma.service';

export type Artist = {
  id: string;
  name: string;
  grammy: boolean;
};

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async getAllArtists() {
    return await this.prisma.artist.findMany();
  }

  async getArtistById(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    console.log(artist);

    if (!artist) {
      throw new HttpException(
        ErrorMessages.recordDoestExist,
        HttpStatus.NOT_FOUND,
      );
    }

    return artist;
  }

  async createArtist(dto: CreateArtistDto) {
    const data = {
      id: uuid.v4(),
      name: dto.name,
      grammy: dto.grammy,
    };

    return await this.prisma.artist.create({ data });
  }

  async updateArtistInfo(id: string, dto: CreateArtistDto) {
    await this.getArtistById(id);
    return await this.prisma.artist.update({
      where: { id },
      data: {
        name: dto.name,
        grammy: dto.grammy,
      },
    });
  }

  async deleteArtistById(id: string) {
    await this.getArtistById(id);
    await this.prisma.artist.delete({ where: { id } });
  }
}
