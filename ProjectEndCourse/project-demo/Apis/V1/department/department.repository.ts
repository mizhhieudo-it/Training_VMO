import { statusProject } from './../statusProject/stautsProject.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Repository } from 'Shared/Database/Reposiory';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { TECH_CONST } from '../technology/technology.const';
import mongoose from 'mongoose';
import { DepartmentDocument } from './department.schema';
import { DEPARTMENT_CONST } from './department.const';
import { ERROR } from 'Shared/Common/err-code.const';

@Injectable()
export class departmentRepository extends Repository<DepartmentDocument> {
  constructor(
    @InjectModel(DEPARTMENT_CONST.MODEL_NAME)
    private readonly _repoDepartment: Model<DepartmentDocument>,
  ) {
    super(_repoDepartment);
  }

  async departmentAsync(id: mongoose.Types.ObjectId) {
    try {
      let findDepartment = await this._repoDepartment.findById(id);
      if (
        !findDepartment.manager &&
        findDepartment.menber.length === 0 &&
        findDepartment.project.length === 0
      ) {
        await this._repoDepartment.findByIdAndRemove(id);
        return Promise.resolve(findDepartment);
      } else {
        return Promise.reject(new Error(ERROR.DELETE_REFERENCE_EXIST.MESSAGE));
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getListDepartmentAsync(): Promise<DepartmentDocument[]> {
    try {
      let result = await this._repoDepartment
        .find({})
        .populate('manager', 'name')
        .populate('menber', 'name')
        .populate('project', 'name');
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getIdDepartmentAsync(
    id: mongoose.Types.ObjectId,
  ): Promise<DepartmentDocument[]> {
    try {
      let result = await this._repoDepartment
        .find({ _id: id })
        .populate('manager', 'name')
        .populate('menber', 'name')
        .populate('project', 'name');
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
