import { Injectable } from "@nestjs/common";
import { CreateCatDto } from "./dtos/test.dtos";
import { testRepository } from "./test.repository";
import { CatDocument } from './test.schema';

@Injectable()
export class testService {

    constructor(private _testRepo: testRepository) {

    }

    async createAsync(item: CreateCatDto) {
        const { name } = item;
        const userCreate = this._testRepo.store(<CatDocument>{ name });
        return userCreate
    }

}