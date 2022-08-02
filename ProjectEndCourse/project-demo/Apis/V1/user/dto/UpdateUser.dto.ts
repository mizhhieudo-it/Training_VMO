import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({ example: 'Mizh Hieu Do' })
    name?: string;

    issuedBy?: string;

    issuedDate?: string;

    daysInTrial?: string;
}
