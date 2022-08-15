import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { technologyModule } from '../technology/technology.module';
import { EMPLOYEE_CONST } from './employee.const';
import { employeeController } from './employee.controller';
import { employeeRepository } from './employee.repository';
import { EmployeeSchema } from './employee.schema';
import { EmployeeService } from './employee.service';

@Module({
  controllers: [employeeController],
  providers: [employeeRepository, EmployeeService],
  imports: [
    MongooseModule.forFeature([
      {
        name: EMPLOYEE_CONST.MODEL_NAME,
        schema: EmployeeSchema,
      },
    ]),
    technologyModule,
  ],
  exports: [employeeRepository],
})
export class employeeModule {}
