import { JwtAuthGuard } from './Shared/Auth/guards/jwt.guards';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { testModule } from 'Apis/V1/testAPI/test.module';
import { UserModule } from 'Apis/V1/user/user.module';
import { AuthModule } from 'Shared/Auth/auth.module';
import { ProjectTypesModule } from 'Apis/V1/projectTypes/projectTypes.module';
import { StatusProjectModule } from 'Apis/V1/statusProject/stautsProject.module';
import { technologyModule } from 'Apis/V1/technology/technology.module';
import { employeeModule } from 'Apis/V1/employee/employee.module';
import { customerModule } from 'Apis/V1/customer/customer.module';
import { ConfigModule } from '@nestjs/config';
import { projectModule } from 'Apis/V1/project/project.module';
import { departmentModule } from 'Apis/V1/department/department.module';
import { CloudinaryModule } from 'Shared/Common/upload-files/Cloudinary/cloudinary.module';
import { configFilesInterceptor } from 'Shared/Middlewares/Interception/ConfigFilesUpload.interceptor';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Project-Demo'),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    technologyModule,
    UserModule,
    AuthModule,
    ProjectTypesModule,
    StatusProjectModule,
    employeeModule,
    customerModule,
    projectModule,
    departmentModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    configFilesInterceptor,
  ],
})
export class AppModule {}
