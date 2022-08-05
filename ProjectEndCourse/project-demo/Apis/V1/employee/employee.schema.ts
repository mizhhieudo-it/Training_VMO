import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document, Types, Schema as MongooseSchema } from 'mongoose'
import { TECH_CONST } from '../technology/technology.const';

export type EmployeeDocument = Employee & Document;

@Schema({ timestamps: true })
export class Employee {

    @Prop({ type: String, length: 255, required: true })
    name: string;

    @Prop({ type: String, length: 255, default: null })
    dateOfBirth: Date;

    @Prop({ type: String, length: 255, unique: true, required: true })
    address: string;

    @Prop({ type: String, length: 255, required: true })
    citizenCode: string;

    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: TECH_CONST.MODEL_NAME }])
    technology: Types.ObjectId[];

    @Prop({ type: Number, length: 255, default: '' })
    experience: number;

    @Prop({ type: [String], length: 255, default: '' })
    foreignLanguage: string[];

    @Prop({ type: [String], length: 255, default: '' })
    certificate: string[];
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);