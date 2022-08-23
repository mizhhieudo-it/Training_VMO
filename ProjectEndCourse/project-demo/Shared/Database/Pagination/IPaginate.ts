import { IPaginateParams } from './IPaginateParamsBase';

export interface IListParams {
  conditions?: any;
  projections?: any;
  paginate: IPaginateParams;
}
