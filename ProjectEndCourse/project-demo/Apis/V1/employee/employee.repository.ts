import { InjectModel } from "@nestjs/mongoose";
import { Repository } from "Shared/Database/Reposiory";
import { EmployeeDocument } from "./employee.schema";
import { EMPLOYEE_CONST } from "./employee.const";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { TECH_CONST } from '../technology/technology.const';
import mongoose from 'mongoose';

@Injectable()
export class employeeRepository extends Repository<EmployeeDocument>{
    constructor(@InjectModel(EMPLOYEE_CONST.MODEL_NAME) private readonly _repoEmployee: Model<EmployeeDocument>,
    ) {
        super(_repoEmployee);
    }
    async getListEmployeesAsync(): Promise<EmployeeDocument[]> {
        try {
            let result = await this._repoEmployee.find({}).populate('technology', "name");
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async getIdEmployeesAsync(id: mongoose.Types.ObjectId): Promise<EmployeeDocument[]> {
        try {
            let result = await this._repoEmployee.find({ _id: id }).populate('technology', "name");
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    }


}