import { Module } from '@nestjs/common';
import { DatabaseModule } from 'configs/database/database.module';
import { userProvider } from './user.provider';
import Repository from "../../../shared/database/Repository";
import { UserRepository } from "../user/user.repository";
import { UserService } from "../user/user.service";
import { UserController } from './user.controller';
@Module({
    imports: [DatabaseModule],
    providers: [UserService, UserRepository, Repository, ...userProvider],
    exports: [UserService, UserRepository],
    controllers: [UserController],
})
export class UserModule { }