import { IsString, IsInt } from 'class-validator';
// check validation data befor come to controller
export class CreateCatDto {
    @IsString()
    name: string;
}