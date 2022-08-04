import { InjectModel } from '@nestjs/mongoose';
import { Repository } from './../../../Shared/Database/Reposiory';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { TECH_CONST } from './technology.const';
import { technologyDocument } from './technology.schema';

@Injectable()
export class TechRepository extends Repository<technologyDocument>{
    constructor(@InjectModel(TECH_CONST.MODEL_NAME) private userModel: Model<technologyDocument>) {
        super(userModel);
    }
}
