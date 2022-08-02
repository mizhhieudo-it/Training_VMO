import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { USER_CONST } from "./user.const";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserSchema } from './user.schema';
import { UserService } from "./user.service";


@Module({
    imports: [MongooseModule.forFeature([{
        name: USER_CONST.MODEL_NAME,
        schema: UserSchema
    }])],
    providers: [UserRepository, UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule { }