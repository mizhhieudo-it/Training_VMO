import { Injectable } from '@nestjs/common';
//import { CreateProjectDto } from './dto/createProjectTypes.dto';
import mongoose from 'mongoose';
import { UpdateProjectDto } from './dto/updateProjectTypes.dto';
import { ProjectTypesRepository } from './projectTypes.repository';
import { ProjectTypesDocument } from './projectTypes.schema';
import { ResponSchema } from 'Shared/utils/dataRespon_schema';
import { ResponSchemaConst } from 'Shared/Common/respon-mess.const';
import { CreateProjectTypeDto } from './dto/createProjectTypes.dto';

@Injectable()
export class projectTypesService {
  constructor(private readonly _projectRepository: ProjectTypesRepository) {}

  async CreateAsync(project: CreateProjectTypeDto) {
    const { name, status } = project;
    try {
      let result = await this._projectRepository.store(<ProjectTypesDocument>{
        name,
        status,
      });
      return Promise.resolve(
        ResponSchema(ResponSchemaConst.Schema_Get, result),
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
  async UpdateAsync(id: string, item: UpdateProjectDto) {
    let convertId = new mongoose.Types.ObjectId(id);
    const { status } = item;
    try {
      let result = await this._projectRepository.update(convertId, <
        ProjectTypesDocument
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
