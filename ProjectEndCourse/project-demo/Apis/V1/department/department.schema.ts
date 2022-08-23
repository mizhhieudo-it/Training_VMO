import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { EMPLOYEE_CONST } from '../employee/employee.const';
import { PROJECT_CONST } from '../project/project.const';
import { TECH_CONST } from '../technology/technology.const';

export type DepartmentDocument = Department & Document;

@Schema({ timestamps: true })
export class Department {
  @Prop({ type: String, length: 255, required: true })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Date })
  dateOfBirth: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: EMPLOYEE_CONST.MODEL_NAME })
  manager: Types.ObjectId;

  @Prop([
    { type: MongooseSchema.Types.ObjectId, ref: EMPLOYEE_CONST.MODEL_NAME },
  ])
  menber: Types.ObjectId[];

  @Prop([
    { type: MongooseSchema.Types.ObjectId, ref: PROJECT_CONST.MODEL_NAME },
  ])
  project: Types.ObjectId[];
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
