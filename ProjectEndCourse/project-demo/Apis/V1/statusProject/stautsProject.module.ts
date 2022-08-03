
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { statusProjectController } from "./statusProject.controller";
import { StatusProjectRepository } from "./stautsProject.repository";

import { StautsProjectService } from "./statusProject.service";
import { STATUS_PROJECT_CONST } from "./statusProject.const";
import { statusProjectSchema } from "./stautsProject.schema";



@Module({
    imports: [MongooseModule.forFeature([{
        name: STATUS_PROJECT_CONST.MODEL_NAME,
        schema: statusProjectSchema
    }])],
    providers: [StatusProjectRepository, StautsProjectService],
    controllers: [statusProjectController],
})
export class StatusProjectModule { }