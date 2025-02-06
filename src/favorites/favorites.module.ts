import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LoggingModule } from 'src/logging/logging.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [
    ArtistModule,
    AlbumModule,
    TrackModule,
    PrismaModule,
    LoggingModule,
  ],
})
export class FavoritesModule {}
