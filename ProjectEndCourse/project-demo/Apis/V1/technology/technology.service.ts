import { IListParams } from 'Shared/Database/Pagination/IPaginate';
import { UpdateTechDto } from './dtos/updateTechnology.dto';
import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { CreateTechDto } from './dtos/createTechnology.dto';

import { TechRepository } from './technology.repository';
import { technologyDocument } from './technology.schema';
import { ResponSchema } from 'Shared/utils/dataRespon_schema';
import { ResponSchemaConst } from 'Shared/Common/respon-mess.const';

@Injectable()
export class technologyService {
  constructor(private readonly _repoTech: TechRepository) {}
  async createAsync(technology: CreateTechDto) {
    const { name, status } = technology;
    try {
      let result = await this._repoTech.store(<technologyDocument>{
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
      let result = await this._repoTech.getById(
        new mongoose.Types.ObjectId(id),
      );
      return Promise.resolve(
        ResponSchema(ResponSchemaConst.Schema_Get, result),
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async UpdateAsync(id: string, item: UpdateTechDto) {
    let convertId = new mongoose.Types.ObjectId(id);
    const { status } = item;
    try {
      let result = await this._repoTech.update(convertId, <technologyDocument>{
        status,
      });
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
      let result = await this._repoTech.remove(convertId);
      return Promise.resolve(
        ResponSchema(ResponSchemaConst.Schema_Delete, result),
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async GetAsync(params) {
    try {
      let { search, page, pageSize, sortBy, orderBy } = params;
      let listOfCondition = [];
      search
        ? listOfCondition.push({
            name: { $regex: '.*' + search + '.*', $options: 'i' },
          })
        : null;
      let condition = {};
      if (listOfCondition.length > 0) {
        condition = { $and: listOfCondition };
      }
      // console.log(condition);
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
      let result = await this._repoTech.get(searchParams);
      let respon = ResponSchema(ResponSchemaConst.Schema_Get, result);
      return Promise.resolve(respon);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async GetAllAsync() {
    try {
      let result = await this._repoTech.getAll();
      return Promise.resolve(
        ResponSchema(ResponSchemaConst.Schema_Get, result),
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
