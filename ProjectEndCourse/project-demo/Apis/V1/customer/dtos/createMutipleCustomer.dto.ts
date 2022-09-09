import { ApiProperty } from '@nestjs/swagger';

export class createMutipleCustomerDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  })
  files?: string;
}
