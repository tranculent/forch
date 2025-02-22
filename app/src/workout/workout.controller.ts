import { Controller, Post, Body, Get } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';

@Controller('workouts') // Base route: /workouts
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Get()
  async getWorkouts() {
    return this.workoutService.findAll();
  }

  @Post()
  async createWorkout(@Body() workoutDto: CreateWorkoutDto) {
    return this.workoutService.create(workoutDto);
  }
}
