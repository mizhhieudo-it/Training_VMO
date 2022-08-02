import { swaggerSchemaExample } from '../utils/swagger_schema';

export const AUTH_SWAGGER_RESPONSE = {
    LOGIN_SUCCESS: swaggerSchemaExample(
        {
            data: {
                accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
                accessTokenExpire: 86400,
            },
            statusCode: 200,
        },
        'login success',
    ),
    LOGIN_FAIL: swaggerSchemaExample(
        {
            message: 'User not found, disabled or locked',
            code: 'sys00001',
            statusCode: 404,
        },
        'User not found',
    ),
    BAD_REQUEST_EXCEPTION: swaggerSchemaExample(
        {
            message: 'bad exception',
            code: 'sys00001',
            statusCode: 400,
        },
        'bad request exception',
    ),
    UNAUTHORIZED_EXCEPTION: swaggerSchemaExample(
        {
            message: 'Unauthorized',
            code: 'sys00001',
            statusCode: 401,
        },
        'Unauthorized exception, you need to login again',
    ),
    NOT_FOUND_EXCEPTION: swaggerSchemaExample(
        {
            message: 'not found exception',
            code: 'sys00001',
            statusCode: 404,
        },
        'not found exception',
    ),
    INTERNAL_SERVER_EXCEPTION: swaggerSchemaExample(
        {
            message: 'internal server error',
            code: 'sys00001',
            statusCode: 500,
        },
        'internal server error',
    ),
};
