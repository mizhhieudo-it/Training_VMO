import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { testModule } from 'Apis/V1/testAPI/test.module';
import { UserModule } from 'Apis/V1/user/user.module';
import { AuthModule } from 'Shared/Auth/auth.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/Project-Demo'), testModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
