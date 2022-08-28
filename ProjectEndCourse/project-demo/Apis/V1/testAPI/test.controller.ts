import { Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
import { CreateCatDto } from './dtos/test.dtos';
import { testService } from './test.service';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('test')
@Controller('test')
export class testController {
    constructor(private _testService: testService) {
    }

    @Post()
    @HttpCode(200)
    create(@Body() item: CreateCatDto) {

        let result = this._testService.createAsync(item);
        return result;
    }
}