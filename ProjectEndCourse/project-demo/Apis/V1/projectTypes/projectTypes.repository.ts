import { InjectModel } from '@nestjs/mongoose';
import { Repository } from '../../../Shared/Database/Reposiory';

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';;
import { ProjectTypesDocument } from './projectTypes.schema';
import { PROJECT_TYPE_CONST } from './projectTypes.const';

@Injectable()
export class ProjectTypesRepository extends Repository<ProjectTypesDocument>{
    constructor(@InjectModel(PROJECT_TYPE_CONST.MODEL_NAME) private projectTypesModel: Model<ProjectTypesDocument>) {
        super(projectTypesModel);
    }
}