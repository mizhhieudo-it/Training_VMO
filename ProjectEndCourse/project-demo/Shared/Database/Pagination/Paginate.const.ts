import { Type } from "class-transformer";
import { IsNumber, Min  ,IsOptional, Max} from "class-validator";

export class PaginationParams {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @Max(100)
    pageSize?: number;
   
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number;
  }