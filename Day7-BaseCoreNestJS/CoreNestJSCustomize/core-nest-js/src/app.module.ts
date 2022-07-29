import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from "./configs/database/database.module";

@Module({
  // config path env
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [],
  providers: [DatabaseModule],
})
export class AppModule { }
