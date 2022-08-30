import { IPaginateParams } from './IPaginateParamsBase';

export interface IListParams {
  conditions?: any;
  projections?: any;
  paginate: IPaginateParams;
}

export interface resultPaging {
  data : any,
  numberOfDocuments : number,
  lastPage : number,
  nextPage : number,
  prevPage : number,
  currentPage : number
}