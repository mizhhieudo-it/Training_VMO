import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateStatusProjectDto {
  @ApiProperty({ example: 'InProcess' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
