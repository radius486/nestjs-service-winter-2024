import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ErrorMessages } from 'src/common/constants/error-messages';

export class CreateArtistDto {
  @ApiProperty({
    example: 'Artist 4',
    description: 'Artist name',
    required: true,
  })
  @IsNotEmpty({ message: `name ${ErrorMessages.shouldNotBeEmpty}` })
  @IsString({ message: `name ${ErrorMessages.shouldBeString}` })
  readonly name: string;
  @ApiProperty({
    example: true,
    description: 'Artist has grammy',
    required: true,
  })
  @IsNotEmpty({ message: `grammy ${ErrorMessages.shouldNotBeEmpty}` })
  @IsBoolean({ message: `grammy ${ErrorMessages.shouldBeABoolean}` })
  readonly grammy: boolean;
}
