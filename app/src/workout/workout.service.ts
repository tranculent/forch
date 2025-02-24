
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Workout, WorkoutDocument } from './workout.schema';
import { isValidObjectId, Model } from 'mongoose';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectModel(Workout.name) private workoutModel: Model<WorkoutDocument>,
  ) {}

  async findAll(): Promise<Workout[]> {
    return this.workoutModel.find().exec();
  }

  async create(createWorkoutDto: CreateWorkoutDto): Promise<Workout> {
    if (!createWorkoutDto.name) {
      console.log('name')
      throw new BadRequestException('Invalid workout name.');
    }

    if (createWorkoutDto.duration <= 0) {
      console.log('duration')
      throw new BadRequestException('Duration must be at least 1 minute.');
    }

    if (createWorkoutDto.distance && createWorkoutDto.distance < 1) {
      console.log('distance')
      throw new BadRequestException('Distance must be at least 1 meter.');
    }

    if (!createWorkoutDto.distanceUnit) {
      createWorkoutDto.distanceUnit = 'km'; // Default unit if not provided
    }

    const newWorkout = new this.workoutModel(createWorkoutDto);
    return newWorkout.save();
  }

  // Validate ObjectId Before Performing Any Action
  private validateObjectId(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
  }

  async update(id: string, updateWorkoutDto: UpdateWorkoutDto): Promise<Workout> {
    this.validateObjectId(id); // Validate ID before querying

    const updatedWorkout = await this.workoutModel.findByIdAndUpdate(id, updateWorkoutDto, {
      new: true,
    }).exec();

    if (!updatedWorkout) {
      throw new NotFoundException(`Workout with ID ${id} not found.`);
    }

    return updatedWorkout;
  }

  async delete(id: string): Promise<boolean> {
    this.validateObjectId(id); // Validate ID before querying

    const result = await this.workoutModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Workout with ID ${id} not found.`);
    }

    return true;
  }
}
