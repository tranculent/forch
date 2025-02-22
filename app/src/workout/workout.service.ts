
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Workout, WorkoutDocument } from './workout.schema';
import { Model } from 'mongoose';
import { CreateWorkoutDto } from './dto/create-workout.dto';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectModel(Workout.name) private workoutModel: Model<WorkoutDocument>,
  ) {}

  async findAll(): Promise<Workout[]> {
    return this.workoutModel.find().exec();
  }

  async create(createWorkoutDto: CreateWorkoutDto): Promise<Workout> {
    const newWorkout = new this.workoutModel(createWorkoutDto);
    return newWorkout.save();
  }
}