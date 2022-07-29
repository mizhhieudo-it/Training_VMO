import { UserRepository } from "./user.repository";
import { UserDocument } from "./user.schema";
export class UserService {
    constructor(private _userRepository: UserRepository) {
    }
    createAsync = async (item: UserDocument) => {
        try {
            let result = await this._userRepository.createAsync(item);
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