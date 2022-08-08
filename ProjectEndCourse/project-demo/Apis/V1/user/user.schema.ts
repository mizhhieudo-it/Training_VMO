import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {

    @Prop({ type: String, length: 255, unique: true, required: true })
    userId: string;

    @Prop({ type: String, length: 255, default: null })
    name: string;

    @Prop({ type: String, length: 255, unique: true, required: true })
    email: string;


    @Prop({ type: String, length: 255, required: true })
    @Exclude()
    password: string;

    @Prop({ type: String, length: 255, default: '' })
    issuedBy: string;

    @Prop({ type: String, length: 255, default: '' })
    issuedDate: string;

    @Prop({ type: String, length: 255, default: '' })
    daysInTrial: string;

    @Prop({ default: false })
    public isEmailConfirmed: boolean;

    @Prop({ default: ['user'] })
    public roles: string[];

    @Prop({ type: String })
    public refreshToken: string ;

    // login with third party authentication

    @Prop({ type: String })
    public idGithub : string ;

    @Prop({ type: String })
    public idFacebook : string ;

    @Prop({ type: String })
    public idGoogle : string ;


}

export const UserSchema = SchemaFactory.createForClass(User);