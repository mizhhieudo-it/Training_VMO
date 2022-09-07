import { swaggerParamsExample } from 'Shared/utils/swagger_params';
import { swaggerSchemaExample } from 'Shared/utils/swagger_schema';

export const DEPARTMENT_CONST = {
  MODEL_NAME: 'DEPARTMENT',
  MODEL_PROVIDER: 'DEPARTMENT_MODEL',
};

export const DEPARTMENT_SWAGGER_RESPONSE = {
  CREATE_DEPARTMENT: swaggerSchemaExample(
    {
      data: {
        name: 'Department',
        description: 'for project NodeJS,Pythons,C#',
        dateOfBirth: '8-5-2022',
        manager: '630d8b83c14d43b364d2d87a',
        menber: ['630d8b96c14d43b364d2d87c', '630d8ba5c14d43b364d2d87e'],
        project: ['630d902e997692513bce5acf'],
      },
      statusCode: 201,
    },
    'Api example for create product',
  ),
};
export const DEPARTMENT_PARAMETERS = {
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

export const DEPARTMENT_CONST_PARAMETERS = {
  SEARCH_PARAMS: swaggerParamsExample(DEPARTMENT_PARAMETERS.SEARCH_PARAMS),
  PAGE_PARAMS: swaggerParamsExample(DEPARTMENT_PARAMETERS.PAGE_PARAMS),
  PAGE_SIZE_PARAMS: swaggerParamsExample(DEPARTMENT_PARAMETERS.PAGE_SIZE),
  ORDER_BY__PARAMS: swaggerParamsExample(DEPARTMENT_PARAMETERS.ORDER_BY),
  SORT_BY__PARAMS: swaggerParamsExample(DEPARTMENT_PARAMETERS.SORT_BY),
};
