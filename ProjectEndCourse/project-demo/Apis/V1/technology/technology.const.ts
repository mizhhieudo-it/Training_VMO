import { swaggerParamsExample } from 'Shared/utils/swagger_params';
import { swaggerSchemaExample } from 'Shared/utils/swagger_schema';

export const TECH_CONST = {
  MODEL_NAME: 'TECHNOLOGY',
  MODEL_PROVIDER: 'TECHNOLOGY_MODEL',
};

export const TECH_PARAMETERS = {
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

export const TECH_CONST_PARAMETERS = {
  SEARCH_PARAMS: swaggerParamsExample(TECH_PARAMETERS.SEARCH_PARAMS),
  PAGE_PARAMS: swaggerParamsExample(TECH_PARAMETERS.PAGE_PARAMS),
  PAGE_SIZE_PARAMS: swaggerParamsExample(TECH_PARAMETERS.PAGE_SIZE),
  ORDER_BY__PARAMS: swaggerParamsExample(TECH_PARAMETERS.ORDER_BY),
  SORT_BY__PARAMS: swaggerParamsExample(TECH_PARAMETERS.SORT_BY),
};

export const TECH_SWAGGER_RESPONSE = {
  CREATE_TECH: swaggerSchemaExample(
    {
      data: {
        name: 'NodeJS',
        status: true,
      },
      statusCode: 201,
    },
    'Api example for create technology instance',
  ),
};
