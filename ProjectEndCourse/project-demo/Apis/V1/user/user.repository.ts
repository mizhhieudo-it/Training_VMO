import { InjectModel } from '@nestjs/mongoose';
import { Repository } from './../../../Shared/Database/Reposiory';
import { UserDocument } from './user.schema';
import { USER_CONST } from "./user.const";
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<UserDocument>{
    constructor(@InjectModel(USER_CONST.MODEL_NAME) private userModel: Model<UserDocument>) {
        super(userModel);
    }
}
