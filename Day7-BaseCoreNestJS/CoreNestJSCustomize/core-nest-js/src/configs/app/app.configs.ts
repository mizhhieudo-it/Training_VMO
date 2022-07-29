import { INestApplication, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
export default (app:INestApplication) => {
    app.enableCors({
        // allow all server loading resource
        origin : true , 
        // acpt some method ..
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        // acpt credentials
        credentials : true
    })
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: ['1'],
        prefix: 'api/v',
      });

    if(process.env.NODE_ENV !== 'production'){
        const configSwagger = new DocumentBuilder().
        setTitle('Base NestJS Demo').
        setDescription('APIs documents for BaseNestJS')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
        const document = SwaggerModule.createDocument(app, configSwagger);
        SwaggerModule.setup('api', app, document);
    }
}