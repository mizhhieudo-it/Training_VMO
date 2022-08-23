import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdateDepartmentDto {
  @ApiProperty({ example: 'Department' })
  @IsString()
  name: string;

  @ApiProperty({ example: '8-5-2022' })
  @IsDate()
  dateOfBirth: Date;

  @ApiProperty({ example: 'for project NodeJS,Pythons,C#' })
  @IsString()
  description: string;

  @ApiProperty({ example: '62ec90f98c8f1735e5049e08' })
  @IsString()
  manager: string;

  @ApiProperty({ example: '["62ec90f98c8f1735e5049e08"]' })
  @IsArray()
  menber: string[];

  @IsString()
  @ApiProperty({ example: '62ec90f98c8f1735e5049e08' })
  project: string[];
}
