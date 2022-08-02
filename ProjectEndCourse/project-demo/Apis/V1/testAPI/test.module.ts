import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { testController } from "./test.controller";
import { testRepository } from "./test.repository";
import { CatSchema, Cat } from './test.schema';
import { testService } from './test.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
    providers: [testService, testRepository],
    controllers: [testController],
})
export class testModule {

}