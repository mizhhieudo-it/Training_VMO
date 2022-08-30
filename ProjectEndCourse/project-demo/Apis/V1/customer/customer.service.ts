import { IListParams } from './../../../Shared/Database/Pagination/IPaginate';

import { Injectable, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { ResponSchemaConst } from 'Shared/Common/respon-mess.const';

import { ResponSchema } from 'Shared/utils/dataRespon_schema';
import { UpdateProjectDto } from '../projectTypes/dto/updateProjectTypes.dto';
import { ProjectTypesDocument } from '../projectTypes/projectTypes.schema';
import { CustomerRepository } from './customer.repository';
import { CustomerDocument } from './customer.scheme';
import { createCustomerDto } from './dtos/createCustomer.dto';
import { updateCustomerDto } from './dtos/updateCustomer.dto';

@Injectable()
export class customerService {
  constructor(private readonly _customerRepository: CustomerRepository) {}

  async CreateAsync(
    customer: createCustomerDto,
  ): Promise<{ content: any; data: any }> {
    const { name, descriptions } = customer;
    try {
      let result = await this._customerRepository.store(<CustomerDocument>{
        name,
        descriptions,
      });
      let respon = ResponSchema(ResponSchemaConst.Schema_Create, result);
      return Promise.resolve(respon);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async GetById(id: string) {
    try {
      let result = await this._customerRepository.getById(
        new mongoose.Types.ObjectId(id),
      );
      let respon = ResponSchema(ResponSchemaConst.Schema_Get, result);
      return Promise.resolve(respon);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async UpdateAsync(id: string, item: updateCustomerDto) {
    let convertId = new mongoose.Types.ObjectId(id);
    const { descriptions } = item;
    try {
      let result = await this._customerRepository.update(convertId, <
        CustomerDocument
      >{ descriptions });
      let respon = ResponSchema(ResponSchemaConst.Schema_Update, result);
      return Promise.resolve(respon);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async RemoveAsync(id: string) {
    let convertId = new mongoose.Types.ObjectId(id);
    try {
      let result = await this._customerRepository.remove(convertId);
      let respon = ResponSchema(ResponSchemaConst.Schema_Delete, '');
      return Promise.resolve(respon);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async GetAllAsync() {
    try {
      let result = await this._customerRepository.getAll();
      let respon = ResponSchema(ResponSchemaConst.Schema_Get, result);
      return Promise.resolve(respon);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async GetAsync(params) {
    try {
      let {search,page,pageSize} = params;
      let searchParams : IListParams = search ? {
        conditions: {
           "name": { $regex: '.*' + search + '.*' ,$options:'i'} 
      },
        projections: "",
        paginate: {
          pageSize,
          page
        }
      } : {
        conditions: {},
       projections: "",
       paginate: {
         pageSize,
         page
       }
      }

      let result = await this._customerRepository.get(searchParams);
      let respon = ResponSchema(ResponSchemaConst.Schema_Get, result);
      return Promise.resolve(respon);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
