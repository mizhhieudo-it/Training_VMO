import { technology } from './../technology/technology.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TechnologyModule } from '../technology/technology.module';
import { EMPLOYEE_CONST } from './employee.const';
import { employeeController } from './employee.controller';
import { employeeRepository } from './employee.repository';
import { Employee, EmployeeSchema } from './employee.schema';
import { EmployeeService } from './employee.service';
import { ERROR } from 'Shared/Common/err-code.const';
import { ProjectModule } from '../project/project.module';

@Module({
  controllers: [employeeController],
  providers: [employeeRepository, EmployeeService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: EMPLOYEE_CONST.MODEL_NAME,
        useFactory: () => {
          const schema = EmployeeSchema;
          return schema;
        },
      },
    ]),
    TechnologyModule,
  ],
  exports: [employeeRepository],
})
export class EmployeeModule {}
