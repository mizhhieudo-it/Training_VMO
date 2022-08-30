import { Schema, Document, Model } from 'mongoose';
import { IRepository } from './Interface/IRepository';
import mongoose from 'mongoose';
import { Result_Error } from './repository.const';
import { IListParams, resultPaging } from './Pagination/IPaginate';
export class Repository<T extends Document> implements IRepository<T> {
  constructor(private _repository: Model<T>) {}
  async get(paginateParam?: IListParams): Promise<resultPaging>{
    let { conditions, projections, paginate } = paginateParam;
    let { pageSize, sort, sortBy, content, page } = paginate;
    pageSize = pageSize ? pageSize : 50;
    sort = sort ? sort : 'asc';
    sortBy = sortBy ? sortBy : '';
    content = content ? content : '';
    conditions = conditions ? conditions : null;
    page = page ? page : 1;

    let skipDocument: number = (Number(page) - 1) * Number(pageSize);
    try {
      let data = await this._repository.find(conditions).skip(skipDocument).limit(pageSize);
      let numberOfDocuments = await this._repository.find(conditions).count();
      let lastPage = Math.ceil(numberOfDocuments/pageSize) ; 
      let nextPage=page+1 >lastPage ? null :page+1;
      let prevPage= page - 1 < 1 ? page :page-1;

      let result = {
        data : [...data],
        numberOfDocuments : numberOfDocuments,
        lastPage : lastPage,
        nextPage : nextPage,
        prevPage : prevPage,
        currentPage : page
      }

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
