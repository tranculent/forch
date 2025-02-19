import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Workout {
  @Prop({ required: true }) exercise: string;
  @Prop() reps: number;
  @Prop() weight: number;
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
