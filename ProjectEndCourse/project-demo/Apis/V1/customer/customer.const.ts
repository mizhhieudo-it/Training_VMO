import { swaggerSchemaExample } from "Shared/utils/swagger_schema";

export const CUSTOMER_CONST = {
    MODEL_NAME: 'CUSTOMER',
    MODEL_PROVIDER: 'CUSTOMER_MODEL',
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
