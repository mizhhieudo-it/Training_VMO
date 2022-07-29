import { USER_CONST } from './user.constant';
import { UserEntity } from './user.schema';
import { Connection } from 'mongoose';
export const userProvider = [
    {
        provide: USER_CONST.MODEL_PROVIDER,
        // get repository's User 
        useFactory: (connection: Connection) => {
            return connection.model<UserEntity>
        }
        ,
        inject: ['DATABASE_CONNECTION'],
    },
];
