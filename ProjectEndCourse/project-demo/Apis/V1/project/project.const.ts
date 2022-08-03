import { swaggerSchemaExample } from "Shared/utils/swagger_schema";

export const PROJECT_CONST = {
    MODEL_NAME: 'PROJECT',
    MODEL_PROVIDER: 'PROJECT_MODEL',
};

export const PROJECT_SWAGGER_RESPONSE = {
    CREATE_PROJECT: swaggerSchemaExample(
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
