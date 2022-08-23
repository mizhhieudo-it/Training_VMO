import { EMPLOYEE_CONST } from './../employee/employee.const';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { STATUS_PROJECT_CONST } from '../statusProject/statusProject.const';
import { TECH_CONST } from '../technology/technology.const';
import { CUSTOMER_CONST } from '../customer/customer.const';
export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({ type: String, length: 255, required: true })
  name: string;

  @Prop({ type: String, length: 255 })
  description: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: STATUS_PROJECT_CONST.MODEL_NAME,
  })
  typeProject: Types.ObjectId;

  @Prop([
    {
      type: MongooseSchema.Types.ObjectId,
      ref: STATUS_PROJECT_CONST.MODEL_NAME,
    },
  ])
  status: Types.ObjectId[];

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: TECH_CONST.MODEL_NAME }])
  technology: Types.ObjectId[];

  @Prop([
    { type: MongooseSchema.Types.ObjectId, ref: EMPLOYEE_CONST.MODEL_NAME },
  ])
  employee: Types.ObjectId[];

  @Prop([
    { type: MongooseSchema.Types.ObjectId, ref: CUSTOMER_CONST.MODEL_NAME },
  ])
  customer: Types.ObjectId[];

  @Prop({ type: Date })
  startDate: Date;
}

export const projectSchema = SchemaFactory.createForClass(Project);
