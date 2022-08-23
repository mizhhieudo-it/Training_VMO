import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class createCustomerDto {
  @ApiProperty({ example: 'Công ty ABC' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Công ty giải phát mạng' })
  @IsString()
  @IsNotEmpty()
  descriptions: String;

  file: any;
}
