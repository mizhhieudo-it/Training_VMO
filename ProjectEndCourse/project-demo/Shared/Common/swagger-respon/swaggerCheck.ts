import { swaggerSchemaExample } from "Shared/utils/swagger_schema";

export const SWAGGER_RESPONSE = {
    HEALTH_CHECK: swaggerSchemaExample(
        {
            data: {
                message: 'OK Test',
            },
            statusCode: 200,
        },
        'API for health check',
    ),
};
