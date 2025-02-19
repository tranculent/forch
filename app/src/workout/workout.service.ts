
import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';

@Injectable()
export class WorkoutService {
  private workouts: CreateWorkoutDto[] = [];

  create(workoutDto: CreateWorkoutDto) {
    const newWorkout = { id: Date.now(), ...workoutDto };
    this.workouts.push(newWorkout);
    return newWorkout;
  }

  findAll() {
    return this.workouts;
  }
}
