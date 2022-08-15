import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class confirmMail {
  @ApiProperty({
    example: 'abc@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  mail: string;
}
export class ActiveAccount {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VnVzZXIiXSwiaWF0',
  })
  @IsString()
  token: string;
}
