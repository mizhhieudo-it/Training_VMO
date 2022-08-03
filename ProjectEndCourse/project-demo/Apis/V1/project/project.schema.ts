import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {

    @Prop({ type: String, length: 255, unique: true, required: true })
    name: string;

    @Prop({ type: Boolean, default: true })
    status: boolean;
}

export const projectSchema = SchemaFactory.createForClass(Project);