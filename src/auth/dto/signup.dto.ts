import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ErrorMessages } from 'src/common/constants/error-messages';
import { Match } from 'src/common/decorators/march.decorator';

export class SignupDto {
  @ApiProperty({ example: 'user_4', description: 'User login' })
  @IsNotEmpty({ message: `login ${ErrorMessages.shouldNotBeEmpty}` })
  @IsString({ message: `login ${ErrorMessages.shouldBeString}` })
  readonly login: string;

  @ApiProperty({ example: 'qwerty123', description: 'User password' })
  @IsNotEmpty({ message: `password ${ErrorMessages.shouldNotBeEmpty}` })
  @IsString({ message: `password ${ErrorMessages.shouldBeString}` })
  @Length(4, 16, { message: `password ${ErrorMessages.lengthFrom4To16}` })
  readonly password: string;

  @ApiProperty({
    example: 'qwerty123',
    description: 'User password confirmation',
  })
  @IsNotEmpty({ message: `confirm password ${ErrorMessages.shouldNotBeEmpty}` })
  @IsString({ message: `confirm password ${ErrorMessages.shouldBeString}` })
  @Length(4, 16, {
    message: `confirm password ${ErrorMessages.lengthFrom4To16}`,
  })
  @Match('password', { message: ErrorMessages.passwordsDoNotMatch })
  readonly passwordConfirmation: string;
}
