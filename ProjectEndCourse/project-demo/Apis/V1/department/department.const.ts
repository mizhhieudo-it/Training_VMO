import { swaggerSchemaExample } from 'Shared/utils/swagger_schema';

export const DEPARTMENT_CONST = {
  MODEL_NAME: 'DEPARTMENT',
  MODEL_PROVIDER: 'DEPARTMENT_MODEL',
};

export const DEPARTMENT_SWAGGER_RESPONSE = {
  CREATE_DEPARTMENT: swaggerSchemaExample(
    {
      data: {
        name: 'employee1',
        dateOfBirth: '2022-07-20T20:25:46.121Z',
        address: 'Ha Noi , Co nhue , Bac Tu Liem',
        citizenCode: '123456789999',
        technology: ['62e8fd3b10a8e6faf8952e6e'],
        experience: 6,
        foreignLanguage: ['english'],
        certificate: ['ielts 6.5'],
        createdAt: '2022-07-20T20:25:46.121Z',
        updatedAt: '2022-07-20T20:25:46.121Z',
      },
      statusCode: 201,
    },
    'Api example for create product',
  ),
};
