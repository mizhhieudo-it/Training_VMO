import { swaggerSchemaExample } from 'Shared/utils/swagger_schema';

export const EMPLOYEE_CONST = {
  MODEL_NAME: 'EMPLOYEE',
  MODEL_PROVIDER: 'EMPLOYEE_MODEL',
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
