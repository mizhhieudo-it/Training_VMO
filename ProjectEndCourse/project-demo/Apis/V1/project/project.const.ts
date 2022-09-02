import { swaggerParamsExample } from 'Shared/utils/swagger_params';
import { swaggerSchemaExample } from 'Shared/utils/swagger_schema';

export const PROJECT_CONST = {
  MODEL_NAME: 'PROJECT',
  MODEL_PROVIDER: 'PROJECT_MODEL',
};

export const PROJECT_SWAGGER_RESPONSE = {
  CREATE_PROJECT: swaggerSchemaExample(
    {
      data: {
        name: 'Dự án OO1',
        description: 'Dự án thuộc công ty VMO',
        status: ['62f9cc8e43a3573bc4db3794'],
        technology: ['62f9ef205b21c481e99f211d'],
        employee: ['62f9f409de04b2babee16479'],
        customer: ['62f0baeee2dc6ef924aad661'],
        startDate: '2022-07-20',
      },
      statusCode: 201,
    },
    'Api example for create product',
  ),
};

export const PROJECT_PARAMETERS = {
  SEARCH_PARAMS: {
    name: 'search',
    type: String,
    required: false,
    description: 'Search params for field name project ',
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
  STATUS_FILTER: {
    name: 'status',
    type: String,
    required: false,
    description: 'filter by status',
  },
  TYPE_PROJECT_FILTER: {
    name: 'typeProject',
    type: String,
    required: false,
    description: 'filter by type project ',
  },
  TECH_FILTER: {
    name: 'technology',
    type: String,
    required: false,
    description: 'filter ny technology',
  },
  CUSTOMER_FILTER: {
    name: 'customer',
    type: String,
    required: false,
    description: 'filter customer in project',
  },
  START_DATE_FILTER: {
    name: 'startDate',
    type: Date,
    required: false,
    description: 'filter date in project',
  },
  SORT_BY: {
    name: 'sortBy',
    type: String,
    required: false,
    description: 'sort by field ',
  },
  ORDER_BY: {
    name: 'orderBy',
    type: String,
    required: false,
    description: 'order by asc/desc',
  },
};

export const PROJECT_CONST_PARAMETERS = {
  SEARCH_PARAMS: swaggerParamsExample(PROJECT_PARAMETERS.SEARCH_PARAMS),
  PAGE_PARAMS: swaggerParamsExample(PROJECT_PARAMETERS.PAGE_PARAMS),
  PAGE_SIZE_PARAMS: swaggerParamsExample(PROJECT_PARAMETERS.PAGE_SIZE),
  TECH_FILTER_PARAMS: swaggerParamsExample(PROJECT_PARAMETERS.TECH_FILTER),
  TYPE_PROJECT_FILTER_PARAMS: swaggerParamsExample(
    PROJECT_PARAMETERS.TYPE_PROJECT_FILTER,
  ),
  STATUS_FILTER_PARAMS: swaggerParamsExample(PROJECT_PARAMETERS.STATUS_FILTER),
  CUSTOMER_FILTER_PARAMS: swaggerParamsExample(
    PROJECT_PARAMETERS.CUSTOMER_FILTER,
  ),
  PROJECT_TIME_CREATED_AT_FILTER_PARAMS: swaggerParamsExample(
    PROJECT_PARAMETERS.START_DATE_FILTER,
  ),
  ORDER_BY__PARAMS: swaggerParamsExample(PROJECT_PARAMETERS.ORDER_BY),
  SORT_BY__PARAMS: swaggerParamsExample(PROJECT_PARAMETERS.SORT_BY),
};
