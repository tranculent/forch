import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutService } from './workout.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workout } from './workout.schema';

// Mock Workout Data
const mockWorkout = {
  _id: '65d6b59e56abf1a7898c2134',
  name: 'Morning Run',
  duration: 45,
  type: 'Cardio',
};

// Correctly Mock Mongoose Model with exec()
class MockWorkoutModel {
  constructor(private data: any) {}
  save = jest.fn().mockResolvedValue(mockWorkout); // Mock save() method

  static find = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue([mockWorkout]), // Mock exec()
  });

  static findByIdAndUpdate = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockWorkout), // Mock exec() for update
  });

  static findByIdAndDelete = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockWorkout), // Mock exec() for delete
  });
}

describe('WorkoutService', () => {
  let service: WorkoutService;
  let model: Model<Workout>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkoutService,
        { provide: getModelToken(Workout.name), useValue: MockWorkoutModel },
      ],
    }).compile();

    service = module.get<WorkoutService>(WorkoutService);
    model = module.get<Model<Workout>>(getModelToken(Workout.name));
  });

  it('should create a workout', async () => {
    const result = await service.create(mockWorkout);
    expect(result).toEqual(mockWorkout);
  });

  it('should get all workouts', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockWorkout]);
  });

  it('should update a workout', async () => {
    const durationAmount = 60;
    const updatedWorkout = { ...mockWorkout, duration: durationAmount };
    MockWorkoutModel.findByIdAndUpdate.mockReturnValue({
      exec: jest.fn().mockResolvedValue(updatedWorkout),
    });

    const result = await service.update(mockWorkout._id, { duration: durationAmount });
    expect(result.duration).toBe(durationAmount);
  });

  it('should delete a workout', async () => {
    const result = await service.delete(mockWorkout._id);
    expect(result).toBe(true);
  });
});
