import { InjectModel } from '@nestjs/mongoose';
import { Repository } from '../../../Shared/Database/Reposiory';
import { Cat, CatDocument } from './test.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class testRepository extends Repository<CatDocument> {
    constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {
        super(catModel);
    }
}