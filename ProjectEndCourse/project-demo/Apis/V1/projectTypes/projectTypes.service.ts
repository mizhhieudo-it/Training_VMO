import { Injectable } from "@nestjs/common";
import { CreateProjectDto } from "./dto/createProjectTypes.dto";
import mongoose from 'mongoose';
import { UpdateProjectDto } from "./dto/updateProjectTypes.dto";
import { ProjectTypesRepository } from "./projectTypes.repository";
import { ProjectTypesDocument } from "./projectTypes.schema";

@Injectable()
export class projectTypesService {
    constructor(private readonly _projectRepository: ProjectTypesRepository) { }

    async CreateAsync(project: CreateProjectDto) {
        const { name, status } = project;
        try {
            let result = await this._projectRepository.store(<ProjectTypesDocument>{ name, status });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async GetById(id: string) {
        try {
            let result = await this._projectRepository.getById(new mongoose.Types.ObjectId(id));
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async UpdateAsync(id: string, item: UpdateProjectDto) {
        let convertId = new mongoose.Types.ObjectId(id);
        const { status } = item;
        try {
            let result = await this._projectRepository.update(convertId, <ProjectTypesDocument>{ status });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async RemoveAsync(id: string) {
        let convertId = new mongoose.Types.ObjectId(id);
        try {
            let result = await this._projectRepository.remove(convertId);
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async GetAllAsync() {
        try {
            let result = await this._projectRepository.getAll();
            return Promise.resolve(result);

        } catch (error) {
            return Promise.reject(error);
        }
    }

}