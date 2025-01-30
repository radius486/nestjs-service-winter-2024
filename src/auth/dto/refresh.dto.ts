import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InVzZXJfNCIsInVzZXJJZCI6IjQyNmFiNzQwLWQ5MTEtNGNkYS1iNzc2LWQ0M2ZlMTQ4Mzc4YyIsImlhdCI6MTczNzYzNzc5MSwiZXhwIjoxNzM3NzI0MTkxfQ.H4Z0NuIpuIYUc7wYWFjpp_PQDV5u24Qjbx8kwjdrAMg',
    description: 'Refresh token',
  })
  readonly refreshToken: string;
}
