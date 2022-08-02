import { Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
import { CreateCatDto } from './dtos/test.dtos';
import { testService } from './test.service';
import { Response } from "Express";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('test')
@Controller('test')
export class testController {
    constructor(private _testService: testService) {
    }

    @Post()
    @HttpCode(200)
    create(@Body() item: CreateCatDto, @Res() res: Response) {

        let result = this._testService.createAsync(item);
        res.send(result);
    }
}