import { swaggerParamsExample } from 'Shared/utils/swagger_params';
import { swaggerSchemaExample } from 'Shared/utils/swagger_schema';

export const USER_CONST = {
  MODEL_NAME: 'USER',
  MODEL_PROVIDER: 'USER_MODEL',
};

export const USER_SWAGGER_RESPONSE = {
  CREATE_USER: swaggerSchemaExample(
    {
      data: {
        userId: 'user02',
        name: 'Thomas Smith',
        email: 'testUser2@gmail.com',
        issuedBy: '',
        issuedDate: '',
        daysInTrial: '',
        deletedAt: null,
        id: 9,
        createdAt: '2022-07-20T20:25:46.121Z',
        updatedAt: '2022-07-20T20:25:46.121Z',
      },
      statusCode: 201,
    },
    'Api example for create user',
  ),
};
export const USER_PARAMETERS = {
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

export const USERS_CONST_PARAMETERS = {
  SEARCH_PARAMS: swaggerParamsExample(USER_PARAMETERS.SEARCH_PARAMS),
  PAGE_PARAMS: swaggerParamsExample(USER_PARAMETERS.PAGE_PARAMS),
  PAGE_SIZE_PARAMS: swaggerParamsExample(USER_PARAMETERS.PAGE_SIZE),
  ORDER_BY__PARAMS: swaggerParamsExample(USER_PARAMETERS.ORDER_BY),
  SORT_BY__PARAMS: swaggerParamsExample(USER_PARAMETERS.SORT_BY),
};
