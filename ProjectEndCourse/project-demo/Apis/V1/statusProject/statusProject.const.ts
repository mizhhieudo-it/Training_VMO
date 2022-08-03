import { swaggerSchemaExample } from "Shared/utils/swagger_schema";

export const STATUS_PROJECT_CONST = {
    MODEL_NAME: 'STATUS_PROJECT',
    MODEL_PROVIDER: 'STATUS_PROJECT_MODEL',
};

export const PROJECT_SWAGGER_RESPONSE = {
    CREATE_STATUS_PROJECT: swaggerSchemaExample(
        {
            data: {
                name: 'InProcess',
                status: 'true',
                createdAt: '2022-07-20T20:25:46.121Z',
                updatedAt: '2022-07-20T20:25:46.121Z',
            },
            statusCode: 201,
        },
        'Api example for create product',
    ),
};
