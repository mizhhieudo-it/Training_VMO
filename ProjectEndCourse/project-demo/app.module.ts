import { JwtAuthGuard } from './Shared/Auth/guards/jwt.guards';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { testModule } from 'Apis/V1/testAPI/test.module';
import { UserModule } from 'Apis/V1/user/user.module';
import { AuthModule } from 'Shared/Auth/auth.module';
import { ProjectModule } from 'Apis/V1/project/project.module';
import { StatusProjectModule } from 'Apis/V1/statusProject/stautsProject.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/Project-Demo'), testModule, UserModule, AuthModule, ProjectModule, StatusProjectModule],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },],
})
export class AppModule { }
