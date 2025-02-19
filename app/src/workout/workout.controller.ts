import { Controller, Post, Body } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';

@Controller('workouts') // Base route: /workouts
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post()
  async createWorkout(@Body() workoutDto: CreateWorkoutDto) {
    return this.workoutService.create(workoutDto);
  }
}
