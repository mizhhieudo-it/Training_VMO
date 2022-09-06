import { Module, Controller } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeModule } from '../employee/employee.module';
import { ProjectModule } from '../project/project.module';
import { DEPARTMENT_CONST } from './department.const';
import { DepartmentController } from './department.controller';
import { departmentRepository } from './department.repository';
import { DepartmentSchema } from './department.schema';
import { DepartmentService } from './department.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DEPARTMENT_CONST.MODEL_NAME,
        schema: DepartmentSchema,
      },
    ]),
    EmployeeModule,
    ProjectModule,
  ],
  controllers: [DepartmentController],
  providers: [departmentRepository, DepartmentService],
})
export class DepartmentModule {}
