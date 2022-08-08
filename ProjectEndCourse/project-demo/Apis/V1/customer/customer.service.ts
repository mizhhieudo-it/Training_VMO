import { Injectable } from "@nestjs/common";
import mongoose from "mongoose";
import { UpdateProjectDto } from "../projectTypes/dto/updateProjectTypes.dto";
import { ProjectTypesDocument } from "../projectTypes/projectTypes.schema";
import { CustomerRepository } from "./customer.repository";
import { CustomerDocument } from "./customer.scheme";
import { createCustomerDto } from "./dtos/createCustomer.dto";
import { updateCustomerDto } from "./dtos/updateCustomer.dto";

@Injectable()
export class customerService{
    constructor(private readonly _customerRepository: CustomerRepository) { }

    async CreateAsync(customer: createCustomerDto) {
        const { name, descriptions } = customer;
        try {
            let result = await this._customerRepository.store(<CustomerDocument>{name, descriptions  });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async GetById(id: string) {
        try {
            let result = await this._customerRepository.getById(new mongoose.Types.ObjectId(id));
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async UpdateAsync(id: string, item: updateCustomerDto) {
        let convertId = new mongoose.Types.ObjectId(id);
        const { descriptions } = item;
        try {
            let result = await this._customerRepository.update(convertId, <CustomerDocument>{ descriptions });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    async RemoveAsync(id: string) {
        let convertId = new mongoose.Types.ObjectId(id);
        try {
            let result = await this._customerRepository.remove(convertId);
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async GetAllAsync() {
        try {
            let result = await this._customerRepository.getAll();
            return Promise.resolve(result);

        } catch (error) {
            return Promise.reject(error);
        }
    }
    
}