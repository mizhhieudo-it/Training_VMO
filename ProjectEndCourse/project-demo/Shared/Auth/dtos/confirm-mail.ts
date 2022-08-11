import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class confirmMail {
  @ApiProperty({
    description: 'abc@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  mail: string;
}
export class ActiveAccount {
  @IsString()
  token: string;
}
