import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document, Types, Schema as MongooseSchema } from 'mongoose'
import { TECH_CONST } from '../technology/technology.const';

export type CustomerDocument = Customer & Document;

@Schema({ timestamps: true })
export class Customer {

    @Prop({ type: String, length: 255, required: true })
    name: string;

    @Prop({ type: String, length: 255})
    descriptions: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);