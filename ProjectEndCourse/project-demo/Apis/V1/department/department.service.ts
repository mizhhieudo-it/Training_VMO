import { Injectable } from '@nestjs/common';
import { TechRepository } from '../technology/technology.repository';
import mongoose from 'mongoose';
import {
  convertToObject,
  convertToObjectWithArray,
} from 'Shared/Common/Mapper/convertToObjectId';
import { employeeRepository } from '../employee/employee.repository';
import { ProjectRepository } from '../project/project.repository';
import { CreateDepartmentDto } from './dtos/createDepartment.dto';
import { DepartmentDocument } from './department.schema';
import { departmentRepository } from './department.repository';
import { UpdateDepartmentDto } from './dtos/updateDepartment.dto';
import { ResponSchema } from 'Shared/utils/dataRespon_schema';
import { ResponSchemaConst } from 'Shared/Common/respon-mess.const';

@Injectable()
export class DepartmentService {
  constructor(
    private readonly _employeeRepo: employeeRepository,
    private readonly _projectRepo: ProjectRepository,
    private readonly _departmentRepo: departmentRepository,
  ) {}

  async ViewData() {
    try {
      let listEmployee = await this._employeeRepo.getAll();
      let listProject = await this._projectRepo.getAll();
      let data = {
        employee: listEmployee,
        project: listProject,
      };
      let result = ResponSchema(ResponSchemaConst.Schema_Get, data);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async CreateAsync(deparment: CreateDepartmentDto) {
    const { name, description, dateOfBirth, manager, menber, project } =
      deparment;
    try {
      let convertTypeIdManager = convertToObject(manager);
      let convertTypeIdMenber = convertToObjectWithArray([...menber]);
      let convertTypeIdProject = convertToObjectWithArray([...project]);
      let result = await this._departmentRepo.store(<DepartmentDocument>{
        name,
        description,
        dateOfBirth,
        manager: convertTypeIdManager,
        menber: convertTypeIdMenber,
        project: convertTypeIdProject,
      });

      return Promise.resolve(
        ResponSchema(ResponSchemaConst.Schema_Create, result),
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async GetAllAsync() {
    try {
      let result = await this._departmentRepo.getListDepartmentAsync();
      return Promise.resolve(
        ResponSchema(ResponSchemaConst.Schema_Get, result),
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async GetByIdAsync(id: string) {
    try {
      let result = await this._departmentRepo.getIdDepartmentAsync(
        new mongoose.Types.ObjectId(id),
      );
      return Promise.resolve(
        ResponSchema(ResponSchemaConst.Schema_Get, result),
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async DeleteAsync(id: string) {
    try {
      let result = await this._departmentRepo.remove(
        new mongoose.Types.ObjectId(id),
      );
      return Promise.resolve(
        ResponSchema(ResponSchemaConst.Schema_Delete, result),
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async UpdateAsync(id: string, deparmentDto: UpdateDepartmentDto) {
    const { name, description, dateOfBirth, manager, menber, project } =
      deparmentDto;

    try {
      let convertId = new mongoose.Types.ObjectId(id);
      let convertTypeIdManager = manager ? convertToObject(manager) : manager;
      let convertTypeIdMenber = menber
        ? convertToObjectWithArray([...menber])
        : menber;
      let convertTypeIdProject = project
        ? convertToObjectWithArray([...project])
        : project;

      let result = await this._departmentRepo.update(convertId, <
        DepartmentDocument
      >{
        name,
        description,
        dateOfBirth,
        manager: convertTypeIdManager,
        menber: convertTypeIdMenber,
        project: convertTypeIdProject,
      });
      return Promise.resolve(
        ResponSchema(ResponSchemaConst.Schema_Update, result),
      );

      //   const departmentFound = ...;
      //   const departmentUpdate = Object.assign(departmentFound, deparmentDto);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
