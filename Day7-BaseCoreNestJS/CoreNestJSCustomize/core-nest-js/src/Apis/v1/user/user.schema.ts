import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, model } from 'mongoose';
import { USER_CONST } from './user.constant';


export type UserDocument = UserEntity & Document;

@Schema()
export class UserEntity {

    @Prop({ type: String, length: 255, unique: true })
    userId: string;

    @Prop({ type: String, length: 255, default: null })
    name: string;

    @Prop({ type: String, length: 255, unique: true })
    email: string;

    @Prop({ type: String, length: 255 })
    password: string;

    @Prop({ type: String, length: 255, default: '' })
    issuedBy: string;

    @Prop({ type: String, length: 255, default: '' })
    issuedDate: string;

    @Prop({ type: String, length: 255, default: '' })
    daysInTrial: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
export const UserModel = model<UserDocument>(USER_CONST.MODEL_NAME, UserSchema)