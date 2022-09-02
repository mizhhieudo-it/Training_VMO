import { swaggerParamsExample } from 'Shared/utils/swagger_params';
import { swaggerSchemaExample } from 'Shared/utils/swagger_schema';

export const EMPLOYEE_CONST = {
  MODEL_NAME: 'EMPLOYEE',
  MODEL_PROVIDER: 'EMPLOYEE_MODEL',
};

export const EMPLOYEE_PARAMETERS = {
  SEARCH_PARAMS: {
    name: 'search',
    type: String,
    required: false,
    description: 'Search params for field name employee',
  },
  PAGE_PARAMS: {
    name: 'page',
    type: Number,
    required: false,
    description: 'page params',
  },
  PAGE_SIZE: {
    name: 'pageSize',
    type: Number,
    required: false,
    description: 'pageSize params',
  },
  TECH_FILTER: {
    name: 'technology',
    type: String,
    required: false,
    description: 'technology filter',
  },
  PROJECT_FILTER: {
    name: 'project',
    type: String,
    required: false,
    description: 'project filter',
  },
  SORT_BY: {
    name: 'sortBy',
    type: String,
    required: false,
    description: 'sort by field',
  },
  ORDER_BY: {
    name: 'orderBy',
    type: String,
    required: false,
    description: 'order by field asc/desc',
  },
};

export const EMPLOYEE_CONST_PARAMETERS = {
  SEARCH_PARAMS: swaggerParamsExample(EMPLOYEE_PARAMETERS.SEARCH_PARAMS),
  PAGE_PARAMS: swaggerParamsExample(EMPLOYEE_PARAMETERS.PAGE_PARAMS),
  PAGE_SIZE_PARAMS: swaggerParamsExample(EMPLOYEE_PARAMETERS.PAGE_SIZE),
  TECH_FILTER_PARAMS: swaggerParamsExample(EMPLOYEE_PARAMETERS.TECH_FILTER),
  PROJECT_FILTER_PARAMS: swaggerParamsExample(
    EMPLOYEE_PARAMETERS.PROJECT_FILTER,
  ),
  ORDER_BY__PARAMS: swaggerParamsExample(EMPLOYEE_PARAMETERS.ORDER_BY),
  SORT_BY__PARAMS: swaggerParamsExample(EMPLOYEE_PARAMETERS.SORT_BY),
};

export const PROJECT_SWAGGER_RESPONSE = {
  CREATE_PROJECT: swaggerSchemaExample(
    {
      data: {
        name: 'Department',
        description: 'for project NodeJS,Pythons,C#',
        dateOfBirth: '8-5-2022',
        manager: '62f9f2495f2eff1457583ac2',
        menber: [
          '62f9f409de04b2babee16479',
          '62ff4539fdb38f48f9a41d19',
          '62ff457c34bacc4d416e7116',
          '62ff458834bacc4d416e7118',
        ],
        project: '62f9f69e9e94fe03b020d96d',
      },
      statusCode: 201,
    },
    'Api example for create product',
  ),
};
