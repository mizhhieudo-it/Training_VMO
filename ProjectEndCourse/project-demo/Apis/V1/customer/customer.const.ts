import { fileMimetypeFilter } from 'Shared/Common/upload-files/Local/api-file.filter';
import { memoryStorage } from 'multer';
import { swaggerParamsExample } from 'Shared/utils/swagger_params';
import { swaggerSchemaExample } from 'Shared/utils/swagger_schema';

export const CUSTOMER_CONST = {
  MODEL_NAME: 'CUSTOMER',
  MODEL_PROVIDER: 'CUSTOMER_MODEL',
};

export const CUSTOMER_PARAMETERS = {
  SEARCH_PARAMS: {
    name: 'search',
    type: String,
    required: false,
    description: 'Search params for field name customer',
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
};

export const CUSTOMER_CONST_SWAGGER_RESPONSE = {
  CREATE_CUSTOMER: swaggerSchemaExample(
    {
      data: {
        name: 'Công ty ABC',
        descriptions: 'Công ty chuyên về cung cấp thiết bị mạng',
        createdAt: '2022-07-20T20:25:46.121Z',
        updatedAt: '2022-07-20T20:25:46.121Z',
      },
      statusCode: 201,
    },
    'Api example for create customer',
  ),
};

export const CUSTOMER_CONST_PARAMETERS = {
  SEARCH_PARAMS: swaggerParamsExample(CUSTOMER_PARAMETERS.SEARCH_PARAMS),
  PAGE_PARAMS: swaggerParamsExample(CUSTOMER_PARAMETERS.PAGE_PARAMS),
  PAGE_SIZE_PARAMS: swaggerParamsExample(CUSTOMER_PARAMETERS.PAGE_SIZE),
};

export const uploadFileXLSX = {
  storage: memoryStorage(),
  fileFilter: fileMimetypeFilter(
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ),
};
