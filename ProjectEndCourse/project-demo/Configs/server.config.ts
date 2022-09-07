import {
  ClassSerializerInterceptor,
  INestApplication,
  Version,
  VersioningType,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { optionsSwaggerConfig } from './constant.config';
//=> attach some options
export default function (app: INestApplication) {
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'],
    credentials: true,
  });
  // auto add prefix header router /api/v1
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1'],
    prefix: 'api/v',
  });
  /*
    config some middleware methods
    
    */
  // app.useGlobalInterceptors(
  //     new ClassSerializerInterceptor(app.get(Reflector))
  // );
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Project-Demo')
      .setDescription('APIs documents for Project-Demo')
      .setVersion('1.0')
      .addBearerAuth(undefined, 'defaultBearerAuth')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, optionsSwaggerConfig);
  }
}
