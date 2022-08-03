import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configApp from "./Configs/server.config";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configApp(app);
  try {
    await app.listen(3000);
    console.log(`Port listening on 3000 ☕️☕️☕️...`);

  } catch (error) {

  }
}
bootstrap();
