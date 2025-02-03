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

import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist-dto';
import { artistExample } from 'src/common/examples/open-api-examples';
import { UUIDParam } from 'src/common/helpers/decorators';

@ApiTags('Artists')
@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({ status: HttpStatus.OK, example: [artistExample] })
  @Get()
  getAllArtists() {
    return this.artistService.getAllArtists();
  }

  @ApiOperation({ summary: 'Get artist by id' })
  @ApiParam({ name: 'id', example: '8f86d9c4-b057-47d2-aaf7-66c9945877e6' })
  @ApiResponse({ status: HttpStatus.OK, example: artistExample })
  @Get(':id')
  getArtistById(@UUIDParam('id') id: string) {
    return this.artistService.getArtistById(id);
  }

  @ApiOperation({ summary: 'Create new artist' })
  @ApiResponse({ status: HttpStatus.CREATED, example: artistExample })
  @Post()
  createArtist(@Body() artistDto: CreateArtistDto) {
    return this.artistService.createArtist(artistDto);
  }

  @ApiOperation({ summary: 'Update existing artist by id' })
  @ApiParam({ name: 'id', example: '8f86d9c4-b057-47d2-aaf7-66c9945877e6' })
  @ApiResponse({ status: HttpStatus.OK, example: artistExample })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['name', 'grammy'],
      properties: {
        name: { type: 'string', example: 'Artist 4.1' },
        grammy: { type: 'string', example: true },
      },
    },
  })
  @Put(':id')
  updateArtistInfo(
    @Body() artistDto: CreateArtistDto,
    @UUIDParam('id') id: string,
  ) {
    return this.artistService.updateArtistInfo(id, artistDto);
  }

  @ApiOperation({ summary: 'Remove existing artist by id' })
  @ApiParam({ name: 'id', example: '3f215d85-81f9-4a2b-842f-5ce418ff3006' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtistById(@UUIDParam('id') id: string) {
    return this.artistService.deleteArtistById(id);
  }
}
