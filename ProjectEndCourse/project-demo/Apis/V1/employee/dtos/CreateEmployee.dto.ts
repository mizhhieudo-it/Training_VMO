import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEmployeeDto {
    @ApiProperty({ example: 'Employee1' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: '8/5/2022' })
    @IsDate()
    @IsNotEmpty()
    dateOfBirth: Date;

    @ApiProperty({ example: 'Co nhue,Ha Noi,VietNam' })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({ example: '123456789999' })
    @IsString()
    citizenCode: string;

    @ApiProperty({ example: '62ec90f98c8f1735e5049e08' })
    @IsArray()
    technology: string[]


    @IsNumber()
    @ApiProperty({ example: '6' })
    experience: number;

    @ApiProperty({ example: '["english","chinese","danish"]' })
    @IsArray()
    foreignLanguage: string[]

    @ApiProperty({ example: '["ielts 6.5"]' })
    @IsArray()
    certificate: string[]

}
