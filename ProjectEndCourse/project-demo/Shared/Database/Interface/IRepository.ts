import mongoose, { Document, ObjectId } from 'mongoose';
import { IListParams } from '../Pagination/IPaginate';
export interface IRepository<T extends Document> {
  store(item: T): Promise<T>;
  update(id: mongoose.Types.ObjectId, item: T): Promise<T>;
  remove(id: mongoose.Types.ObjectId): Promise<T>;
  getAll(): Promise<T[]>;
  //get(paginateParma: IListParams): Promise<T[]>;
  getById(id: mongoose.Types.ObjectId): Promise<T>;
  findByCodition(condition: any): Promise<T | T[]>;
}

// class IRepository<T extends Document>{
//     constructor(private _repository: T) {
//     }

//     async Store(item: T): Promise<

// }
