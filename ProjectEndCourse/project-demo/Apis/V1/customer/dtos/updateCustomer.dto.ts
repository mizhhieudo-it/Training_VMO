import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class updateCustomerDto {
  @ApiProperty({ example: 'Công ty giải phát mạng' })
  @IsString()
  @IsNotEmpty()
  descriptions: string;
}
