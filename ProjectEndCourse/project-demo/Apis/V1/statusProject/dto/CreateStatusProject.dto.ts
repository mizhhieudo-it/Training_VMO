import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
    @ApiProperty({ example: 'InProcess' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'true' })
    @IsBoolean()
    @IsNotEmpty()
    status: boolean;
}
