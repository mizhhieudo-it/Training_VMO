import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from "./configs/database/database.module";
import { UserModule } from "./Apis/v1/user/user.module";

@Module({
  // config path env
  imports: [ConfigModule.forRoot(), DatabaseModule, UserModule],
  controllers: [],
  providers: [DatabaseModule],
})
export class AppModule { }
