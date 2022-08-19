import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import {
  convertToObject,
  convertToObjectWithArray,
} from 'Shared/Common/Mapper/convertToObjectId';
import { CustomerRepository } from '../customer/customer.repository';
import { employeeRepository } from '../employee/employee.repository';
import { StatusProjectRepository } from '../statusProject/stautsProject.repository';
import { TechRepository } from '../technology/technology.repository';
import { CreateProjectDto } from './dto/CreateProject.dto';
import { UpdateProjectDto } from './dto/UpdateProject.dto';
import { ProjectRepository } from './project.repository';
import { ProjectDocument } from './project.schema';

@Injectable()
export class ProjectService {
  constructor(
    private readonly _projectRepo: ProjectRepository,
    private readonly _statusProjectRepo: StatusProjectRepository,
    private readonly _techRepo: TechRepository,
    private readonly _customRepo: CustomerRepository,
    private readonly _employeeRepo: employeeRepository,
  ) {}
  async ViewCreate() {
    try {
      let dataTech = await this._techRepo.getAll();
      let dataEmployee = await this._employeeRepo.getAll();
      let dataCustomer = await this._customRepo.getAll();
      let dataStatus = await this._statusProjectRepo.getAll();
      let viewData = [
        ...dataTech,
        ...dataStatus,
        ...dataCustomer,
        ...dataEmployee,
      ];
      return Promise.resolve(viewData);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  // Issue : check convertTypeIdTech
  async CreateAsync(project: CreateProjectDto) {
    const {
      name,
      description,
      status,
      technology,
      employee,
      customer,
      startDate,
    } = project;
    try {
      let convertTypeIdTech = convertToObjectWithArray([...technology]);
      let convertTypeIdStatus = convertToObjectWithArray([...status]);
      let convertTypeIdEmployee = convertToObjectWithArray([...employee]);
      let convertTypeIdCustomer = convertToObjectWithArray([...customer]);

      let result = await this._projectRepo.store(<ProjectDocument>{
        name,
        description,
        status: convertTypeIdStatus,
        employee: convertTypeIdEmployee,
        customer: convertTypeIdCustomer,
        technology: convertTypeIdTech,
        startDate,
      });
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async GetAllAsync() {
    try {
      let result = await this._projectRepo.getAllListProjects();
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async GetByIdAsync(id: string) {
    try {
      let result = await this._projectRepo.findByIdProject(
        new mongoose.Types.ObjectId(id),
      );
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async DeleteAsync(id: string) {
    try {
      let result = await this._projectRepo.remove(
        new mongoose.Types.ObjectId(id),
      );
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  // Issue : check convertTypeIdTech
  async UpdateAsync(id: string, project: UpdateProjectDto) {
    const {
      name,
      description,
      status,
      technology,
      employee,
      customer,
      startDate,
    } = project;
    try {
      let convertTypeIdTech = convertToObjectWithArray([...technology]);
      let convertTypeIdStatus = convertToObjectWithArray([...status]);
      let convertTypeIdEmployee = convertToObjectWithArray([...employee]);
      let convertTypeIdCustomer = convertToObjectWithArray([...customer]);

      let result = await this._projectRepo.update(
        new mongoose.Types.ObjectId(id),
        <ProjectDocument>{
          name,
          description,
          status: convertTypeIdStatus,
          employee: convertTypeIdEmployee,
          customer: convertTypeIdCustomer,
          technology: convertTypeIdTech,
          startDate,
        },
      );
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
