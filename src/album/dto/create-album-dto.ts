import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { ErrorMessages } from 'src/common/constants/error-messages';

export class CreateAlbumDto {
  @ApiProperty({
    example: 'Album 3',
    description: "Album's name",
    required: true,
  })
  @IsNotEmpty({ message: `name ${ErrorMessages.shouldNotBeEmpty}` })
  @IsString({ message: `name ${ErrorMessages.shouldBeString}` })
  readonly name: string;
  @ApiProperty({
    example: 2024,
    description: 'Album year',
    required: true,
  })
  @IsNotEmpty({ message: `year ${ErrorMessages.shouldNotBeEmpty}` })
  @IsNumber({}, { message: `year ${ErrorMessages.shouldBeNumber}` })
  readonly year: number;
  @ApiProperty({
    example: null,
    description: 'Artist id',
    required: false,
  })
  @IsString({ message: `artistId ${ErrorMessages.shouldBeString}` })
  @IsOptional()
  readonly artistId: string | null;
}
