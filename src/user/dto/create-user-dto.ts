import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ErrorMessages } from 'src/common/constants/error-messages';

export class CreateUserDto {
  @ApiProperty({ example: 'user_4', description: 'User login' })
  @IsNotEmpty({ message: `login ${ErrorMessages.shouldNotBeEmpty}` })
  @IsString({ message: `login ${ErrorMessages.shouldBeString}` })
  readonly login: string;
  @ApiProperty({ example: 'qwerty123', description: 'User password' })
  @IsNotEmpty({ message: `password ${ErrorMessages.shouldNotBeEmpty}` })
  @IsString({ message: `password ${ErrorMessages.shouldBeString}` })
  readonly password: string;
}
