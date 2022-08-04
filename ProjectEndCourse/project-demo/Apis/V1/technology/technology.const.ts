import { swaggerSchemaExample } from "Shared/utils/swagger_schema";

export const TECH_CONST = {
    MODEL_NAME: 'TECHNOLOGY',
    MODEL_PROVIDER: 'TECHNOLOGY_MODEL',
};

export const TECH_SWAGGER_RESPONSE = {
    CREATE_TECH: swaggerSchemaExample(
        {
            data: {
                name: 'NodeJS',
                status: true,
            },
            statusCode: 201,
        },
        'Api example for create technology instance',
    ),
};
