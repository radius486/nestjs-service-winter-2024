import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album-dto';
import { albumExample } from 'src/common/examples/open-api-examples';
import { UUIDParam } from 'src/common/helpers/decorators';

@ApiTags('Albums')
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({ status: HttpStatus.OK, example: [albumExample] })
  @Get()
  getAllAlbums() {
    return this.albumService.getAllAlbums();
  }

  @ApiOperation({ summary: 'Get album by id' })
  @ApiParam({ name: 'id', example: '495b9ffb-687b-401a-9b10-a1a764e9deca' })
  @ApiResponse({ status: HttpStatus.OK, example: albumExample })
  @Get(':id')
  getAlbumById(@UUIDParam('id') id: string) {
    return this.albumService.getAlbumById(id);
  }

  @ApiOperation({ summary: 'Create new album' })
  @ApiResponse({ status: HttpStatus.CREATED, example: albumExample })
  @Post()
  createAlbum(@Body() albumDto: CreateAlbumDto) {
    return this.albumService.createAlbum(albumDto);
  }

  @ApiOperation({ summary: 'Edit existing album by id' })
  @ApiParam({ name: 'id', example: '495b9ffb-687b-401a-9b10-a1a764e9deca' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['name', 'year'],
      properties: {
        name: { type: 'string', example: 'Album 1.1' },
        year: { type: 'number', example: 2024 },
        artistId: {
          type: 'string | null',
          example: '8f86d9c4-b057-47d2-aaf7-66c9945877e6',
        },
      },
    },
  })
  @ApiResponse({ status: HttpStatus.OK, example: albumExample })
  @Put(':id')
  updateAlbumInfo(
    @Body() albumDto: CreateAlbumDto,
    @UUIDParam('id') id: string,
  ) {
    return this.albumService.updateAlbumInfo(id, albumDto);
  }

  @ApiOperation({ summary: 'Remove existing album by id' })
  @ApiParam({ name: 'id', example: '0b7f1be2-cd52-4643-8aef-8740b221dc81' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbumById(@UUIDParam('id') id: string) {
    return this.albumService.deleteAlbumById(id);
  }
}
