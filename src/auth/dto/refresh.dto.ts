import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty } from 'class-validator';
import { ErrorMessages } from 'src/common/constants/error-messages';

export class RefreshDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InVzZXJfNCIsInVzZXJJZCI6IjQyNmFiNzQwLWQ5MTEtNGNkYS1iNzc2LWQ0M2ZlMTQ4Mzc4YyIsImlhdCI6MTczNzYzNzc5MSwiZXhwIjoxNzM3NzI0MTkxfQ.H4Z0NuIpuIYUc7wYWFjpp_PQDV5u24Qjbx8kwjdrAMg',
    description: 'Refresh token',
  })
  @IsNotEmpty({ message: `refresh token ${ErrorMessages.shouldNotBeEmpty}` })
  @IsJWT({ message: `refresh token ${ErrorMessages.shouldBeAValidJWT}` })
  readonly refreshToken: string;
}
