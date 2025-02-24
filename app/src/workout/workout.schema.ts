import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorkoutDocument = Workout & Document;

@Schema()
export class Workout {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ default: 0 })
  distance?: number;

  @Prop({ default: "km" })
  distanceUnit?: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true, type: Date })
  date: Date;
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
