import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ErrorMessages } from 'src/common/constants/error-messages';

export class CreateTrackDto {
  @ApiProperty({
    example: 'Track 4',
    description: 'Track name',
    required: true,
  })
  @IsNotEmpty({ message: `name ${ErrorMessages.shouldNotBeEmpty}` })
  @IsString({ message: `name ${ErrorMessages.shouldBeString}` })
  readonly name: string;
  @ApiProperty({
    example: null,
    description: 'Artist id',
    required: false,
  })
  @IsString({ message: `artistId ${ErrorMessages.shouldBeString}` })
  @IsOptional()
  readonly artistId: string | null;
  @ApiProperty({
    example: null,
    description: 'Album id',
    required: false,
  })
  @IsString({ message: `albumId ${ErrorMessages.shouldBeString}` })
  @IsOptional()
  readonly albumId: string | null;
  @ApiProperty({
    example: 80,
    description: 'Track duration',
    required: true,
  })
  @IsNotEmpty({ message: `duration ${ErrorMessages.shouldNotBeEmpty}` })
  @IsNumber({}, { message: `duration ${ErrorMessages.shouldBeNumber}` })
  readonly duration: number;
}
