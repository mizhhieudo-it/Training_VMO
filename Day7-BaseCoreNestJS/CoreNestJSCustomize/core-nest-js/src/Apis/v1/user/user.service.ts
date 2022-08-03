import { UserRepository } from "./user.repository";
import { CreateUserDto } from "../user/dtos/user.req";
import { UserDocument } from "../user/user.schema";
export class UserService {
    constructor(private _userRepository: UserRepository) {
    }
    createAsync = async (item: CreateUserDto) => {
        const { userId, email, password, name } = item;
        try {

            let result = await this._userRepository.createAsync(<UserDocument>{ name, password, userId, email, issuedDate: '', issuedBy: '', daysInTrial: '' });
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error)
        }
    }
    getAsync = async () => {
        try {
            let result = await this._userRepository.AsyncGetAll();
            return Promise.resolve(result)
        } catch (error) {
            return Promise.reject(error)
        }
    }

}