import Repository from "../../../shared/database/Repository";
import { UserEntity, UserDocument, UserSchema, UserModel } from "../user/user.schema";
import * as mongoose from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository extends Repository<UserDocument> {
    constructor(private _useRepository: Repository<UserDocument>) {
        super(UserModel);
    }
}