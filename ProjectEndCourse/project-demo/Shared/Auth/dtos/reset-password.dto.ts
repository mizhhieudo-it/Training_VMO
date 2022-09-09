import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class resetPassword {
  @ApiProperty({
    example: 'abc@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  mail: string;
}
