import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import {
  convertToObject,
  convertToObjectWithArray,
} from 'Shared/Common/Mapper/convertToObjectId';
import { ResponSchemaConst } from 'Shared/Common/respon-mess.const';
import { IListParams } from 'Shared/Database/Pagination/IPaginate';
import { ResponSchema } from 'Shared/utils/dataRespon_schema';
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
      return Promise.resolve(
        ResponSchema(ResponSchemaConst.Schema_Get, viewData),
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async GetAsync(params) {
    try {
      let {
        search,
        page,
        pageSize,
        sortBy,
        orderBy,
        statusProject,
        typeProject,
        technology,
        customer,
        startDate,
      } = params;
      let listOfCondition = [];
      // search for name project
      search
        ? listOfCondition.push({
            name: { $regex: '.*' + search + '.*', $options: 'i' },
          })
        : null;
      // condition filter
      statusProject ? listOfCondition.push({ status: statusProject }) : null;
      typeProject ? listOfCondition.push({ typeProject }) : null;
      technology ? listOfCondition.push({ technology }) : null;
      customer ? listOfCondition.push({ customer }) : null;
      startDate ? listOfCondition.push({ startDate }) : null;
      let condition = {};
      if (listOfCondition.length > 0) {
        condition = { $and: listOfCondition };
      }
      let searchParams: IListParams = {
        conditions: condition,
        projections: '',
        paginate: {
          pageSize,
          page,
          sortBy,
          orderBy,
        },
      };
      let result = await this._projectRepo.get(searchParams);
      let respon = ResponSchema(ResponSchemaConst.Schema_Get, result);
      return respon;
    } catch (error) {
      return Promise.reject(error);
    }
  }

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

      let result = await this._projectRepo.storeProject(<ProjectDocument>{
        name,
        description,
        status: convertTypeIdStatus,
        employee: convertTypeIdEmployee,
        customer: convertTypeIdCustomer,
        technology: convertTypeIdTech,
        startDate,
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
      let result = await this._projectRepo.getAllListProjects();
      return Promise.resolve(
        ResponSchema(ResponSchemaConst.Schema_Get, result),
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async GetByIdAsync(id: string) {
    try {
      let result = await this._projectRepo.findByIdProject(
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
      let result = await this._projectRepo.deleteProjectAsync(
        new mongoose.Types.ObjectId(id),
      );
      return Promise.resolve(
        ResponSchema(ResponSchemaConst.Schema_Delete, result),
      );
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
      return Promise.resolve(
        ResponSchema(ResponSchemaConst.Schema_Update, result),
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
