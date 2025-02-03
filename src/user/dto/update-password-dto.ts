import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ErrorMessages } from 'src/common/constants/error-messages';

export class UpdatePasswordDto {
  @ApiProperty({
    example: 'qwerty',
    description: 'Old user password',
    required: true,
  })
  @IsNotEmpty({ message: `oldPassword ${ErrorMessages.shouldNotBeEmpty}` })
  @IsString({ message: `oldPassword ${ErrorMessages.shouldBeString}` })
  readonly oldPassword: string;
  @ApiProperty({
    example: 'asdfgh',
    description: 'New user password',
    required: true,
  })
  @IsNotEmpty({ message: `newPassword ${ErrorMessages.shouldNotBeEmpty}` })
  @IsString({ message: `newPassword ${ErrorMessages.shouldBeString}` })
  readonly newPassword: string;
}
