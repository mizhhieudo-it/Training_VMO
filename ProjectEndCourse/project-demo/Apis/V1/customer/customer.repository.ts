import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repository } from './../../../Shared/Database/Reposiory';
import { CUSTOMER_CONST } from './customer.const';
import { CustomerDocument } from './customer.scheme';
export class CustomerRepository extends Repository<CustomerDocument>{
    constructor(@InjectModel(CUSTOMER_CONST.MODEL_NAME) private readonly _customerModel: Model<CustomerDocument>) {
        super(_customerModel);      
    }
}