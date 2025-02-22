import { Controller, Get, Post, Patch, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { Workout } from './workout.schema';
import { WorkoutSwaggerExamples } from 'src/docs/swagger-examples';

@ApiTags('workouts') // Categorizes all routes under "workouts"
@Controller('workouts')
export class WorkoutController {
  constructor(
    private readonly workoutService: WorkoutService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new workout' })
  @ApiResponse({ status: 201, description: 'Workout created successfully.' })
  @ApiBody({ type: CreateWorkoutDto }) // Describes the expected body input
  @ApiBody({
    type: CreateWorkoutDto,
    ...WorkoutSwaggerExamples.createWorkout,
  })
  async createWorkout(@Body() workoutDto: CreateWorkoutDto): Promise<Workout> {
    return this.workoutService.create(workoutDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all workouts' })
  @ApiResponse({ status: 200, description: 'List of all workouts.' })
  async getWorkouts(): Promise<Workout[]> {
    return this.workoutService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing workout' })
  @ApiResponse({ status: 200, description: 'Workout updated successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid ID format.' })
  @ApiResponse({ status: 404, description: 'Workout not found.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Workout ID',
  })
  @ApiBody({
    type: UpdateWorkoutDto,
    ...WorkoutSwaggerExamples.updateWorkout,
  })
  async updateWorkout(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto): Promise<Workout> {
    const updatedWorkout = await this.workoutService.update(id, updateWorkoutDto);
    if (!updatedWorkout) {
      throw new NotFoundException(`Workout with ID ${id} not found.`);
    }
    return updatedWorkout;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a workout' })
  @ApiResponse({ status: 200, description: 'Workout deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid ID format.' })
  @ApiResponse({ status: 404, description: 'Workout not found.' })
  @ApiParam({ name: 'id', required: true, description: 'Workout ID' })
  async deleteWorkout(@Param('id') id: string): Promise<boolean> {
    const deleted = await this.workoutService.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Workout with ID ${id} not found.`);
    }
    return true;
  }
}
