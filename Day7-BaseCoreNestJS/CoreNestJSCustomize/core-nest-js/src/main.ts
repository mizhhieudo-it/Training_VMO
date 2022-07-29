import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import appConfig from './configs/app/app.configs';
import { ConfigService } from '@nestjs/config';
const configService = new ConfigService();
const Port = configService.get<string>('PORT');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // confis somethings when app start => create functions config it 
  appConfig(app)
  await app.listen(Port || 3000);
}
bootstrap();
