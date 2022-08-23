import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Mongoose } from 'mongoose';
import { ERROR } from 'Shared/Common/err-code.const';
import { Repository } from 'Shared/Database/Reposiory';
import { PROJECT_CONST } from './project.const';
import { ProjectDocument } from './project.schema';

@Injectable()
export class ProjectRepository extends Repository<ProjectDocument> {
  constructor(
    @InjectModel(PROJECT_CONST.MODEL_NAME)
    private _projectModel: Model<ProjectDocument>,
  ) {
    super(_projectModel);
  }

  async getAllListProjects(): Promise<ProjectDocument[]> {
    try {
      let result = await this._projectModel
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
      let result = await this._projectModel
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
  async deleteProjectAsync(id: mongoose.Types.ObjectId) {
    try {
      let findProject = await this._projectModel.findById(id);
      if (
        !findProject.typeProject &&
        !findProject.status &&
        findProject.technology.length === 0 &&
        findProject.employee.length === 0 &&
        findProject.customer.length === 0
      ) {
        await this._projectModel.findByIdAndRemove(id);
        return Promise.resolve(findProject);
      } else {
        return Promise.reject(new Error(ERROR.DELETE_REFERENCE_EXIST.MESSAGE));
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
