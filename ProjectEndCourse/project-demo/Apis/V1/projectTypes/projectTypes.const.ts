import { swaggerSchemaExample } from "Shared/utils/swagger_schema";

export const PROJECT_TYPE_CONST = {
    MODEL_NAME: 'PROJECT_TYPE',
    MODEL_PROVIDER: 'PROJECT_TYPE_MODEL',
};

export const PROJECT_TYPE_SWAGGER_RESPONSE = {
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
