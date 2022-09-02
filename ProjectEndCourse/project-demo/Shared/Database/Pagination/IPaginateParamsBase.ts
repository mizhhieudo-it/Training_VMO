export interface IPaginateParamsBase {
  /**
   * @field page_size
   * @type number
   * @description size page request.
   * * Default is 20
   * * If page_size=-1 <=> get all data
   * @example page_size=20
   */
  pageSize?: number;
  /**
   * @field orderBy
   * @type string
   * @description orderBy param ASC | DESC
   * @example ASC
   */
  orderBy?: string;

  /**
   * @field sortBy
   * @type string
   * @description field sort
   * @example name
   */
  sortBy?: string;
  /**
   * @field content
   * @type string
   * @description full text search
   * @example duytm
   */
  content?: string;
}

export interface IPaginateParams extends IPaginateParamsBase {
  /**
   * @field page
   * @type number
   * @description set current page
   * @example page:2
   */
  page?: number;
}
