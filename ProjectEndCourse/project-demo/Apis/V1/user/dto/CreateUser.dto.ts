import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  isEmpty,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user01' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 'Mizh Hieu Do' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'testUser@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Password1' })
  @IsString()
  @IsNotEmpty()
  password: string;

  issuedBy?: string;

  issuedDate?: string;

  daysInTrial?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  })
  avatar?: string;
}
