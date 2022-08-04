import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type technologyDocument = technology & Document;

@Schema({ timestamps: true })
export class technology {
    @Prop({ type: String, required: true, unique: true })
    name: string;
    @Prop({ type: Boolean, required: true, default: true })
    status: boolean;
}

export const technologySchema = SchemaFactory.createForClass(technology);