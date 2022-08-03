import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';


export class CreateUserDto {
    @ApiProperty({ example: 'user01' })
    @IsString()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({ example: 'Vu Duy User' })
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
}