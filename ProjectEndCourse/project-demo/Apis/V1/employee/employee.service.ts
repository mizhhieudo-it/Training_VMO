import { Injectable } from '@nestjs/common';
import { TechRepository } from '../technology/technology.repository';
import { CreateEmployeeDto } from './dtos/CreateEmployee.dto';
import { employeeRepository } from './employee.repository';
import { EmployeeDocument } from './employee.schema';
import mongoose from 'mongoose';
import { convertToObject } from 'Shared/Common/Mapper/convertToObjectId';
import { UpdateEmployeeDto } from './dtos/UpdateEmployee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly _employeeRepo: employeeRepository,
    private readonly _techRepo: TechRepository,
  ) {}

  async ViewCreate() {
    try {
      let data = await this._techRepo.getAll();
      return Promise.resolve(data);
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
      let convertTypeIdTech = convertToObject(technology);
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
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async GetAllAsync() {
    try {
      let result = await this._employeeRepo.getListEmployeesAsync();
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async GetByIdAsync(id: string) {
    try {
      let result = await this._employeeRepo.getIdEmployeesAsync(
        new mongoose.Types.ObjectId(id),
      );
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async DeleteAsync(id: string) {
    try {
      let result = await this._employeeRepo.remove(
        new mongoose.Types.ObjectId(id),
      );
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  // Issue : check convertTypeIdTech
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
      let convertTypeIdTech = convertToObject(technology);
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
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
