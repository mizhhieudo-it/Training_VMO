import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'Dự án OO1' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Dự án thuộc công ty VMO' })
  @IsString()
  description: string;

  @ApiProperty({ example: '["62f9cc8e43a3573bc4db3794"]' })
  @IsString()
  status: string[];

  @ApiProperty({ example: '["62f9cc8e43a3573bc4db3794"]' })
  @IsString()
  technology: string[];

  @ApiProperty({ example: '["62f9cc8e43a3573bc4db3794"]' })
  @IsString()
  employee: string[];

  @ApiProperty({ example: '["62f9cc8e43a3573bc4db3794"]' })
  @IsString()
  customer: string[];

  @ApiProperty({ example: '2022-07-20' })
  @IsDate()
  startDate: Date;
}
