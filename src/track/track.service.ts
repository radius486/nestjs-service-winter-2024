import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { CreateTrackDto } from './dto/create-track-dto';
import { ErrorMessages } from 'src/common/constants/error-messages';
import { PrismaService } from 'src/prisma/prisma.service';

export type Track = {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
};

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async getAllTracks() {
    return await this.prisma.track.findMany();
  }

  async getTrackById(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new HttpException(
        ErrorMessages.recordDoestExist,
        HttpStatus.NOT_FOUND,
      );
    }

    return track;
  }

  async createTrack(dto: CreateTrackDto) {
    const data = {
      id: uuid.v4(),
      name: dto.name,
      artistId: dto.artistId || null,
      albumId: dto.albumId || null,
      duration: dto.duration,
    };

    return await this.prisma.track.create({ data });
  }

  async updateTrackInfo(id: string, dto: CreateTrackDto) {
    await this.getTrackById(id);
    return await this.prisma.track.update({
      where: { id },
      data: {
        name: dto.name,
        duration: dto.duration,
        albumId: dto.albumId,
        artistId: dto.artistId,
      },
    });
  }

  async deleteTrackById(id: string) {
    await this.getTrackById(id);
    await this.prisma.track.delete({ where: { id } });
  }
}
