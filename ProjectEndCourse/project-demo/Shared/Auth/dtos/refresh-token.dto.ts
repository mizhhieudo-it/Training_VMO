import { ApiProperty } from "@nestjs/swagger";

export class refreshTokenDto{
    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VnVzZXIiXSwiaWF0',
    })
    token: string;

}