import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        description: 'username',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    username: string;

    @ApiProperty({
        description: 'password',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    password: string;
}
