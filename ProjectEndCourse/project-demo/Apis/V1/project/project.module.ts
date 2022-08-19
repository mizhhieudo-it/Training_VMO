import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { Repository } from '../../../Shared/Database/Reposiory';

import { Model } from 'mongoose';
import { Injectable, Module } from '@nestjs/common';
import { ProjectDocument, projectSchema } from './project.schema';
import { PROJECT_CONST } from './project.const';
import { ProjectController } from './project.controller';
import { ProjectRepository } from './project.repository';
import { ProjectService } from './project.service';
import { customerModule } from '../customer/customer.module';
import { technologyModule } from '../technology/technology.module';
import { StatusProjectModule } from '../statusProject/stautsProject.module';
import { employeeModule } from '../employee/employee.module';
// import { ProjectTypesDocument } from './projectTypes.schema';
// import { PROJECT_TYPE_CONST } from './projectTypes.const';
@Module({
  controllers: [ProjectController],
  providers: [ProjectRepository, ProjectService],
  imports: [
    MongooseModule.forFeature([
      {
        name: PROJECT_CONST.MODEL_NAME,
        schema: projectSchema,
      },
    ]),
    customerModule,
    technologyModule,
    StatusProjectModule,
    employeeModule,
  ],
  exports: [ProjectRepository],
})
export class projectModule {}
