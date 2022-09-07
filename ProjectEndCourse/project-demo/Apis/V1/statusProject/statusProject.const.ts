import { swaggerParamsExample } from 'Shared/utils/swagger_params';
import { swaggerSchemaExample } from 'Shared/utils/swagger_schema';

export const STATUS_PROJECT_CONST = {
  MODEL_NAME: 'STATUS_PROJECT',
  MODEL_PROVIDER: 'STATUS_PROJECT_MODEL',
};

export const PROJECT_SWAGGER_RESPONSE = {
  CREATE_STATUS_PROJECT: swaggerSchemaExample(
    {
      data: {
        name: 'InProcess',
        status: 'true',
        createdAt: '2022-07-20T20:25:46.121Z',
        updatedAt: '2022-07-20T20:25:46.121Z',
      },
      statusCode: 201,
    },
    'Api example for create product',
  ),
};

export const STATUS_PROJECT_PARAMETERS = {
  SEARCH_PARAMS: {
    name: 'search',
    type: String,
    required: false,
    description: 'Search params for field name',
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

export const TECH_TYPE_CONST_PARAMETERS = {
  SEARCH_PARAMS: swaggerParamsExample(STATUS_PROJECT_PARAMETERS.SEARCH_PARAMS),
  PAGE_PARAMS: swaggerParamsExample(STATUS_PROJECT_PARAMETERS.PAGE_PARAMS),
  PAGE_SIZE_PARAMS: swaggerParamsExample(STATUS_PROJECT_PARAMETERS.PAGE_SIZE),
  ORDER_BY__PARAMS: swaggerParamsExample(STATUS_PROJECT_PARAMETERS.ORDER_BY),
  SORT_BY__PARAMS: swaggerParamsExample(STATUS_PROJECT_PARAMETERS.SORT_BY),
};
