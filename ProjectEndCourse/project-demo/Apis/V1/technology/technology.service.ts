import { UpdateTechDto } from './dtos/updateTechnology.dto';
import { Injectable } from "@nestjs/common";
import mongoose from "mongoose";
import { CreateTechDto } from "./dtos/createTechnology.dto";

import { TechRepository } from "./technology.repository";
import { technologyDocument } from './technology.schema';

@Injectable()
export class technologyService {
    constructor(private readonly _repoTech: TechRepository) {

    }
    async createAsync(technology: CreateTechDto) {
        const { name, status } = technology;
        try {
            let result = await this._repoTech.store(<technologyDocument>{ name, status });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async GetById(id: string) {
        try {
            let result = await this._repoTech.getById(new mongoose.Types.ObjectId(id));
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async UpdateAsync(id: string, item: UpdateTechDto) {
        let convertId = new mongoose.Types.ObjectId(id);
        const { status } = item;
        try {
            let result = await this._repoTech.update(convertId, <technologyDocument>{ status });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async RemoveAsync(id: string) {
        let convertId = new mongoose.Types.ObjectId(id);
        try {
            let result = await this._repoTech.remove(convertId);
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async GetAllAsync() {
        try {
            let result = await this._repoTech.getAll();
            return Promise.resolve(result);

        } catch (error) {
            return Promise.reject(error);
        }
    }

}