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
