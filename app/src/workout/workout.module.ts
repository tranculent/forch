import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { Workout, WorkoutSchema } from './workout.schema';  // Import model

@Module({ 
  imports: [
    MongooseModule.forFeature([{ name: Workout.name, schema: WorkoutSchema }]) // Register model here
  ],
  controllers: [WorkoutController],
  providers: [WorkoutService],
  exports: [WorkoutService, MongooseModule],
})
export class WorkoutModule {}