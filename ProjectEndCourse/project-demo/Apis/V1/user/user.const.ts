import { swaggerSchemaExample } from "Shared/utils/swagger_schema";

export const USER_CONST = {
    MODEL_NAME: 'user',
    MODEL_PROVIDER: 'USER_MODEL',
};

export const USER_SWAGGER_RESPONSE = {
    CREATE_USER: swaggerSchemaExample(
        {
            data: {
                userId: 'user02',
                name: 'Vu Duy User',
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
