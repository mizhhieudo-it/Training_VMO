import { AWSMoudle } from './Shared/Common/upload-files/AWS/upload-files-aws.module';
import { JwtAuthGuard } from './Shared/Auth/guards/jwt.guards';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { testModule } from 'Apis/V1/testAPI/test.module';
import { UserModule } from 'Apis/V1/user/user.module';
import { AuthModule } from 'Shared/Auth/auth.module';
import { ProjectTypesModule } from 'Apis/V1/projectTypes/projectTypes.module';
import { StatusProjectModule } from 'Apis/V1/statusProject/stautsProject.module';
import { TechnologyModule } from 'Apis/V1/technology/technology.module';
import { EmployeeModule } from 'Apis/V1/employee/employee.module';
import { CustomerModule } from 'Apis/V1/customer/customer.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProjectModule } from 'Apis/V1/project/project.module';
import { DepartmentModule } from 'Apis/V1/department/department.module';
import { CloudinaryModule } from 'Shared/Common/upload-files/Cloudinary/cloudinary.module';
import { configFilesInterceptor } from 'Shared/Middlewares/Interception/ConfigFilesUpload.interceptor';
import { MulterModule } from '@nestjs/platform-express';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    MulterModule.register({
      storage: './upload',
    }),
    TechnologyModule,
    UserModule,
    AuthModule,
    ProjectTypesModule,
    StatusProjectModule,
    EmployeeModule,
    CustomerModule,
    ProjectModule,
    DepartmentModule,
    AWSMoudle,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('HOST_REDIS'),
          port: configService.get('PORT_REDIS'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // configFilesInterceptor,
  ],
})
export class AppModule {}
