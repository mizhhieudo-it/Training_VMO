import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({ example: 'true' })
    @IsBoolean()
    @IsNotEmpty()
    status: boolean;
}