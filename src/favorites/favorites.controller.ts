import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';

import {
  albumExample,
  artistExample,
  favoritesExample,
  trackExample,
} from 'src/common/examples/open-api-examples';
import { UUIDParam } from 'src/common/helpers/decorators';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({ status: HttpStatus.OK, example: favoritesExample })
  @Get()
  getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @ApiOperation({ summary: 'Add track to favorites by id' })
  @ApiParam({ name: 'id', example: '66b3d77f-6238-4f2d-ba6f-b3697e03b5aa' })
  @ApiResponse({ status: HttpStatus.CREATED, example: trackExample })
  @Post('/track/:id')
  addTrackToFavorites(@UUIDParam('id') id: string) {
    return this.favoritesService.addTrackToFavorites(id);
  }

  @ApiOperation({ summary: 'Remove track from favorites by id' })
  @ApiParam({ name: 'id', example: '283f7740-15b9-48af-b8d1-aa9dc39af8af' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrackFromFavorites(@UUIDParam('id') id: string) {
    return this.favoritesService.removeTrackFromFavorites(id);
  }

  @ApiOperation({ summary: 'Add album to favorites by id' })
  @ApiParam({ name: 'id', example: '0b7f1be2-cd52-4643-8aef-8740b221dc81' })
  @ApiResponse({ status: HttpStatus.CREATED, example: albumExample })
  @Post('/album/:id')
  addAlbumToFavorites(@UUIDParam('id') id: string) {
    return this.favoritesService.addAlbumToFavorites(id);
  }

  @ApiOperation({ summary: 'Remove album from favorites by id' })
  @ApiParam({ name: 'id', example: '0b7f1be2-cd52-4643-8aef-8740b221dc81' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbumFromFavorites(@UUIDParam('id') id: string) {
    return this.favoritesService.removeAlbumFromFavorites(id);
  }

  @ApiOperation({ summary: 'Add artist to favorites by id' })
  @ApiParam({ name: 'id', example: '3f215d85-81f9-4a2b-842f-5ce418ff3006' })
  @ApiResponse({ status: HttpStatus.CREATED, example: artistExample })
  @Post('/artist/:id')
  addArtistToFavorites(@UUIDParam('id') id: string) {
    return this.favoritesService.addArtistToFavorites(id);
  }

  @ApiOperation({ summary: 'Remove artist from favorites by id' })
  @ApiParam({ name: 'id', example: '3f215d85-81f9-4a2b-842f-5ce418ff3006' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtistFromFavorites(@UUIDParam('id') id: string) {
    return this.favoritesService.removeArtistFromFavorites(id);
  }
}
