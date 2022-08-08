import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';

export type ProjectTypesDocument = ProjectTypes & Document;

@Schema({ timestamps: true })
export class ProjectTypes {

    @Prop({ type: String, length: 255, unique: true, required: true })
    name: string;

    @Prop({ type: Boolean, default: true })
    status: boolean;
}

export const projectTypeSchema = SchemaFactory.createForClass(ProjectTypes);