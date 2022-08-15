import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PROJECT_TYPE_CONST } from './projectTypes.const';
import { projectTypesController } from './projectTypes.controller';
import { ProjectTypesRepository } from './projectTypes.repository';
import { projectTypeSchema } from './projectTypes.schema';
import { projectTypesService } from './projectTypes.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PROJECT_TYPE_CONST.MODEL_NAME,
        schema: projectTypeSchema,
      },
    ]),
  ],
  providers: [ProjectTypesRepository, projectTypesService],
  controllers: [projectTypesController],
})
export class ProjectTypesModule {}
