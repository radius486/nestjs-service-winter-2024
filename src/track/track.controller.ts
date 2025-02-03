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

import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track-dto';
import { trackExample } from 'src/common/examples/open-api-examples';
import { UUIDParam } from 'src/common/helpers/decorators';

@ApiTags('Tracks')
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({ status: HttpStatus.OK, example: [trackExample] })
  @Get()
  getAllTracks() {
    return this.trackService.getAllTracks();
  }

  @ApiOperation({ summary: 'Get track by id' })
  @ApiParam({ name: 'id', example: '6cd3cdca-b31e-4911-8c22-9d08c42b01b4' })
  @ApiResponse({ status: HttpStatus.OK, example: trackExample })
  @Get(':id')
  getTrackById(@UUIDParam('id') id: string) {
    return this.trackService.getTrackById(id);
  }

  @ApiOperation({ summary: 'Create new track' })
  @ApiResponse({ status: HttpStatus.CREATED, example: trackExample })
  @Post()
  createTrack(@Body() trackDto: CreateTrackDto) {
    return this.trackService.createTrack(trackDto);
  }

  @ApiOperation({ summary: 'Update existing track by id' })
  @ApiParam({ name: 'id', example: '6cd3cdca-b31e-4911-8c22-9d08c42b01b4' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['name', 'duration'],
      properties: {
        name: { type: 'string', example: 'Track 1.1' },
        artistId: {
          type: 'string | null',
          example: '8f86d9c4-b057-47d2-aaf7-66c9945877e6',
        },
        albumId: {
          type: 'string | null',
          example: '495b9ffb-687b-401a-9b10-a1a764e9deca',
        },
        duration: { type: 'number', example: 80 },
      },
    },
  })
  @ApiResponse({ status: HttpStatus.OK, example: trackExample })
  @Put(':id')
  updateTrackInfo(
    @Body() trackDto: CreateTrackDto,
    @UUIDParam('id') id: string,
  ) {
    return this.trackService.updateTrackInfo(id, trackDto);
  }

  @ApiOperation({ summary: 'Remove existing track by id' })
  @ApiParam({ name: 'id', example: '66b3d77f-6238-4f2d-ba6f-b3697e03b5aa' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrackById(@UUIDParam('id') id: string) {
    return this.trackService.deleteTrackById(id);
  }
}
