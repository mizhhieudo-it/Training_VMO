import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class confirmMail {
  @ApiProperty({
    description: 'abc@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  mail: string;
}
