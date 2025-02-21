import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorkoutDocument = Workout & Document;

@Schema()
export class Workout {
  @Prop({ required: true })
  name: string;

  @Prop()
  duration: number;

  @Prop()
  type: string;
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
