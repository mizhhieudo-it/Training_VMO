import { swaggerParamsExample } from 'Shared/utils/swagger_params';
import { swaggerSchemaExample } from 'Shared/utils/swagger_schema';

export const PROJECT_TYPE_CONST = {
  MODEL_NAME: 'PROJECT_TYPE',
  MODEL_PROVIDER: 'PROJECT_TYPE_MODEL',
};

export const PROJECT_TYPE_SWAGGER_RESPONSE = {
  CREATE_PROJECT_TYPE: swaggerSchemaExample(
    {
      data: {
        name: 'product',
        status: 'true',
        createdAt: '2022-07-20T20:25:46.121Z',
        updatedAt: '2022-07-20T20:25:46.121Z',
      },
      statusCode: 201,
    },
    'Api example for create product',
  ),
};

export const TECH_TYPE_PARAMETERS = {
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
  SEARCH_PARAMS: swaggerParamsExample(TECH_TYPE_PARAMETERS.SEARCH_PARAMS),
  PAGE_PARAMS: swaggerParamsExample(TECH_TYPE_PARAMETERS.PAGE_PARAMS),
  PAGE_SIZE_PARAMS: swaggerParamsExample(TECH_TYPE_PARAMETERS.PAGE_SIZE),
  ORDER_BY__PARAMS: swaggerParamsExample(TECH_TYPE_PARAMETERS.ORDER_BY),
  SORT_BY__PARAMS: swaggerParamsExample(TECH_TYPE_PARAMETERS.SORT_BY),
};
