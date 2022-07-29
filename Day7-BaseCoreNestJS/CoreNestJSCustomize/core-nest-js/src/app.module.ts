import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  // config path env
  imports: [ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule { }
