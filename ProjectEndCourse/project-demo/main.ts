import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { config } from 'aws-sdk';
import { AppModule } from './app.module';
import configApp from './Configs/server.config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configApp(app);
  try {
    await app.listen(3000);
    console.log(`Port listening on 3000 ☕️☕️☕️...`);
    const configService = app.get(ConfigService);
    config.update({
      accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      region: configService.get('AWS_REGION'),
    });
  } catch (error) {
    console.error(error);
  }
}
bootstrap();
