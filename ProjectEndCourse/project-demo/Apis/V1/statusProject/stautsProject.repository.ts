import { InjectModel } from '@nestjs/mongoose';
import { Repository } from '../../../Shared/Database/Reposiory';

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { statusProjectDocument } from './stautsProject.schema';
import {
  PROJECT_SWAGGER_RESPONSE,
  STATUS_PROJECT_CONST,
} from './statusProject.const';

@Injectable()
export class StatusProjectRepository extends Repository<statusProjectDocument> {
  constructor(
    @InjectModel(STATUS_PROJECT_CONST.MODEL_NAME)
    private stautsProjectModel: Model<statusProjectDocument>,
  ) {
    super(stautsProjectModel);
  }
  async getAllTechAsync() {
    try {
      return await this.stautsProjectModel.find({ status: true }).exec();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
