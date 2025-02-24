import { Injectable } from '@nestjs/common';
import { WorkoutService } from '../workout/workout.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Workout } from '../workout/workout.schema';

@Injectable()
export class ProgressService {
  constructor(
    private readonly workoutService: WorkoutService,
    @InjectModel(Workout.name) private workoutModel: Model<Workout>
  ) {}

  async getDashboardData() {
    const workouts = await this.workoutModel.find().exec();

    // 1️⃣ Calculate Streaks (Example: Consecutive days with workouts)
    const streakData = this.calculateStreaks(workouts);

    // 2️⃣ Calculate Mileage
    const totalWorkouts = workouts.length;
    const totalDistance = workouts.reduce((sum, w) => sum + (w.distance || 0), 0);
    const totalHours = workouts.reduce((sum, w) => sum + (w.duration || 0), 0);

    // 3️⃣ Fetch recent logs (Last 5 workouts)
    const recentLogs = workouts.slice(-5);

    return {
      streaks: streakData,
      mileage: { totalWorkouts, totalDistance, totalHours },
      pastLogs: recentLogs,
    };
  }

  private calculateStreaks(workouts: Workout[]) {
    if (!workouts.length) return { currentStreak: 0, bestStreak: 0 };

    // Sort workouts by date
    const sorted = workouts.sort((a, b) => +new Date(a.date) - +new Date(b.date));

    let currentStreak = 1;
    let bestStreak = 1;
    let lastDate = new Date(sorted[0].date);

    for (let i = 1; i < sorted.length; i++) {
      const currentDate = new Date(sorted[i].date);
      const diff = (currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);

      if (diff === 1) {
        currentStreak++;
      } else {
        bestStreak = Math.max(bestStreak, currentStreak);
        currentStreak = 1;
      }

      lastDate = currentDate;
    }

    return { currentStreak, bestStreak };
  }
}
