import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';

export type statusProjectDocument = statusProject & Document;

@Schema({ timestamps: true })
export class statusProject {

    @Prop({ type: String, length: 255, unique: true, required: true })
    name: string;

    @Prop({ type: Boolean, default: true })
    status: boolean;
}

export const statusProjectSchema = SchemaFactory.createForClass(statusProject);