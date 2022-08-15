import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Mongoose } from 'mongoose';
import { Repository } from 'Shared/Database/Reposiory';
import { PROJECT_CONST } from './project.const';
import { ProjectDocument } from './project.schema';

@Injectable()
export class ProjectRepository extends Repository<ProjectDocument> {
  constructor(
    @InjectModel(PROJECT_CONST.MODEL_NAME)
    private projectModel: Model<ProjectDocument>,
  ) {
    super(projectModel);
  }

  async getAllListProjects(): Promise<ProjectDocument[]> {
    try {
      let result = await this.projectModel
        .find({})
        .populate('status')
        .populate('technology')
        .populate('employee')
        .populate('customer')
        .exec();
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async findByIdProject(id: mongoose.Types.ObjectId) {
    try {
      let result = await this.projectModel
        .find({ _id: id })
        .populate('status')
        .populate('technology')
        .populate('employee')
        .populate('customer');
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
