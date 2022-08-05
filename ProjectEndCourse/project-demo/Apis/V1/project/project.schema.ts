import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';
import { PROJECT_CONST } from './project.const';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true, collection: PROJECT_CONST.MODEL_NAME })
export class Project {

    @Prop({ type: String, length: 255, unique: true, required: true })
    name: string;

    @Prop({ type: Boolean, default: true })
    status: boolean;
}

export const projectSchema = SchemaFactory.createForClass(Project);