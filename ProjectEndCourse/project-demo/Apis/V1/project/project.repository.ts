import { InjectModel } from '@nestjs/mongoose';
import { Repository } from './../../../Shared/Database/Reposiory';

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ProjectDocument } from './project.schema';
import { PROJECT_CONST } from './project.const';

@Injectable()
export class ProjectRepository extends Repository<ProjectDocument>{
    constructor(@InjectModel(PROJECT_CONST.MODEL_NAME) private projectModel: Model<ProjectDocument>) {
        super(projectModel);
    }
}