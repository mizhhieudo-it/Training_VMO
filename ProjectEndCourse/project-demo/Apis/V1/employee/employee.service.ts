import { Injectable } from '@nestjs/common';
import { TechRepository } from '../technology/technology.repository';
import { CreateEmployeeDto } from './dtos/CreateEmployee.dto';
import { employeeRepository } from './employee.repository';
import { EmployeeDocument } from './employee.schema';
import mongoose from 'mongoose';
import {
  convertToObject,
  convertToObjectWithArray,
} from 'Shared/Common/Mapper/convertToObjectId';
import { UpdateEmployeeDto } from './dtos/UpdateEmployee.dto';
import { ResponSchema } from 'Shared/utils/dataRespon_schema';
import { ResponSchemaConst } from 'Shared/Common/respon-mess.const';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly _employeeRepo: employeeRepository,
    private readonly _techRepo: TechRepository,
  ) {}

  async ViewCreate() {
    try {
      let data = await this._techRepo.getAll();
      return Promise.resolve(ResponSchema(ResponSchemaConst.Schema_Get, data));
    } catch (error) {
      return Promise.reject(error);
    }
  }
  // Issue : check convertTypeIdTech
  async CreateAsync(employee: CreateEmployeeDto) {
    const {
      name,
      dateOfBirth,
      address,
      citizenCode,
      technology,
      experience,
      foreignLanguage,
      certificate,
    } = employee;
    try {
      let convertTypeIdTech = convertToObjectWithArray(technology);
      let result = await this._employeeRepo.store(<EmployeeDocument>{
        name,
        dateOfBirth,
        address,
        citizenCode,
        experience,
        foreignLanguage,
        certificate,
        technology: convertTypeIdTech,
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
      let result = await this._employeeRepo.getListEmployeesAsync();
      return Promise.resolve(
        ResponSchema(ResponSchemaConst.Schema_Get, result),
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async GetByIdAsync(id: string) {
    try {
      let result = await this._employeeRepo.getIdEmployeesAsync(
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
      let result = await this._employeeRepo.remove(
        new mongoose.Types.ObjectId(id),
      );
      return Promise.resolve(
        ResponSchema(ResponSchemaConst.Schema_Delete, result),
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async UpdateAsync(id: string, employee: UpdateEmployeeDto) {
    let convertId = new mongoose.Types.ObjectId(id);
    const {
      name,
      dateOfBirth,
      address,
      citizenCode,
      technology,
      experience,
      foreignLanguage,
      certificate,
    } = employee;
    try {
      let convertTypeIdTech = convertToObjectWithArray(technology);
      let result = await this._employeeRepo.update(convertId, <
        EmployeeDocument
      >{
        name,
        dateOfBirth,
        address,
        citizenCode,
        experience,
        foreignLanguage,
        certificate,
        technology: convertTypeIdTech,
      });
      return Promise.resolve(
        ResponSchema(ResponSchemaConst.Schema_Update, result),
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
