import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PROJECT_CONST } from "./project.const";
import { projectController } from "./project.controller";
import { ProjectRepository } from "./project.repository";
import { projectSchema } from "./project.schema";
import { projectService } from "./project.service";



@Module({
    imports: [MongooseModule.forFeature([{
        name: PROJECT_CONST.MODEL_NAME,
        schema: projectSchema
    }])],
    providers: [ProjectRepository, projectService],
    controllers: [projectController],
})
export class ProjectModule { }