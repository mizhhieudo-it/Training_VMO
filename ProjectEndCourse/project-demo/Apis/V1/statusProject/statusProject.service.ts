import { Injectable } from '@nestjs/common';
import { CreateStatusProjectDto } from './dto/CreateStatusProject.dto';

import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/UpdateProject.dto';
import { StatusProjectRepository } from './stautsProject.repository';
import { statusProjectDocument } from './stautsProject.schema';
import { ResponSchema } from 'Shared/utils/dataRespon_schema';
import { ResponSchemaConst } from 'Shared/Common/respon-mess.const';

@Injectable()
export class StautsProjectService {
  constructor(private readonly _projectRepository: StatusProjectRepository) {}

  async CreateAsync(project: CreateStatusProjectDto) {
    const { name, status } = project;
    try {
      let result = await this._projectRepository.store(<statusProjectDocument>{
        name,
        status,
      });
      return Promise.resolve(
        ResponSchema(ResponSchemaConst.Schema_Create, result),
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async GetById(id: string) {
    try {
      let result = await this._projectRepository.getById(
        new mongoose.Types.ObjectId(id),
      );
      return Promise.resolve(
        ResponSchema(ResponSchemaConst.Schema_Get, result),
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async UpdateAsync(id: string, item: UpdateUserDto) {
    let convertId = new mongoose.Types.ObjectId(id);
    const { status } = item;
    try {
      let result = await this._projectRepository.update(convertId, <
        statusProjectDocument
      >{ status });
      return Promise.resolve(
        ResponSchema(ResponSchemaConst.Schema_Update, result),
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async RemoveAsync(id: string) {
    let convertId = new mongoose.Types.ObjectId(id);
    try {
      let result = await this._projectRepository.remove(convertId);
      return Promise.resolve(
        ResponSchema(ResponSchemaConst.Schema_Delete, result),
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async GetAllAsync() {
    try {
      let result = await this._projectRepository.getAll();
      return Promise.resolve(
        ResponSchema(ResponSchemaConst.Schema_Get, result),
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
