import { Schema, Document, Model } from 'mongoose';
import { IRepository } from './Interface/IRepository';
import mongoose from 'mongoose';
import { Result_Error } from './repository.const';
import { IListParams, resultPaging } from './Pagination/IPaginate';
import { SortQueries } from './Pagination/Paginate.const';
export class Repository<T extends Document> implements IRepository<T> {
  constructor(private _repository: Model<T>) {}
  // way1 :  mongo padginate
  // way2 : run by rice
  async get(paginateParam?: IListParams): Promise<resultPaging> {
    try {
      let { conditions, projections, paginate } = paginateParam;
      let { orderBy, sortBy, content } = paginate;
      let pageSize = Number(paginate.pageSize);
      let page = Number(paginate.page);
      pageSize = pageSize ? <number>pageSize : 50;
      orderBy = orderBy ? orderBy.trim().toUpperCase() : orderBy;
      let sortType = orderBy === 'DESC' ? SortQueries.DESC : SortQueries.ASC;
      sortBy = sortBy ? sortBy : '';
      content = content ? content : '';
      conditions = conditions ? conditions : null;
      page = page ? page : 1;
      let numberOfDocuments = await this._repository.find(conditions).count();
      page < 1 ? 1 : page;
      page > numberOfDocuments ? numberOfDocuments : page;
      pageSize < 1 ? 50 : pageSize;
      let lastPage = Math.ceil(numberOfDocuments / pageSize);
      let nextPage = page + 1 > lastPage ? lastPage : page + 1;
      let prevPage = page - 1 < 1 ? 1 : page - 1;
      let skipDocument: number = (Number(page) - 1) * Number(pageSize);
      let data = await this._repository
        .find(conditions)
        .skip(skipDocument)
        .limit(pageSize)
        .sort({ name: sortType })
        .exec();

      let result = {
        data: [...data],
        numberOfDocuments: numberOfDocuments,
        lastPage: lastPage,
        nextPage: nextPage,
        prevPage: prevPage,
        currentPage: page,
      };

      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async store(item: T): Promise<T> {
    try {
      await this._repository.create(item);
      return Promise.resolve(item);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async update(id: mongoose.Types.ObjectId, item: any): Promise<T> {
    try {
      await this._repository.findByIdAndUpdate({ _id: id }, item).exec();
      return Promise.resolve(item);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async remove(id: mongoose.Types.ObjectId): Promise<T> {
    try {
      if (!(await this._repository.findById(id))) {
        return Promise.reject(new Error(Result_Error.DOCUMENT_NOT_FOUND));
      }
      await this._repository.findByIdAndRemove(id);
      return Promise.resolve(this._repository.findById(id));
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getAll(): Promise<T[]> {
    try {
      let result = await this._repository.find({});
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getById(id: mongoose.Types.ObjectId): Promise<T> {
    try {
      return await this._repository.findById(id);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async findByCodition(condition: any): Promise<T> {
    try {
      let result = await this._repository.findOne(condition);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
