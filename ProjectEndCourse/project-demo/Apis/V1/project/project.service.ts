import { Injectable } from "@nestjs/common";
import { CreateProjectDto } from "./dto/CreateProject.dto";
import { ProjectRepository } from "./project.repository";
import { ProjectDocument } from "./project.schema";
import mongoose from 'mongoose';
import { UpdateProjectDto } from "./dto/UpdateProject.dto";

@Injectable()
export class projectService {
    constructor(private readonly _projectRepository: ProjectRepository) { }

    async CreateAsync(project: CreateProjectDto) {
        const { name, status } = project;
        try {
            let result = await this._projectRepository.store(<ProjectDocument>{ name, status });
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
            let result = await this._projectRepository.update(convertId, <ProjectDocument>{ status });
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