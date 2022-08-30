import { swaggerSchemaExample } from 'Shared/utils/swagger_schema';

export const DEPARTMENT_CONST = {
  MODEL_NAME: 'DEPARTMENT',
  MODEL_PROVIDER: 'DEPARTMENT_MODEL',
};

export const DEPARTMENT_SWAGGER_RESPONSE = {
  CREATE_DEPARTMENT: swaggerSchemaExample(
    {
      data: {
        "name": "Department",
        "description": "for project NodeJS,Pythons,C#",
        "dateOfBirth": "8-5-2022",
        "manager": "630d8b83c14d43b364d2d87a",
        "menber": [
          "630d8b96c14d43b364d2d87c",
          "630d8ba5c14d43b364d2d87e"
        ],
        "project": [
          "630d902e997692513bce5acf"
        ]
      },
      statusCode: 201,
    },
    'Api example for create product',
  ),
};
