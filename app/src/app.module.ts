import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { WorkoutController } from './workout/workout.controller';
import { AppService } from './app.service';
import { WorkoutService } from './workout/workout.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkoutModule } from './workout/workout.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { ProgressModule } from './progress-dashboard/progress.module';
import { ProgressController } from './progress-dashboard/progress.controller';
import { ProgressService } from './progress-dashboard/progress.service';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined. Please check your environment variables.");
}

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(MONGO_URI),
    WorkoutModule,
    ProgressModule
  ],
  controllers: [AppController, WorkoutController, ProgressController],
  providers: [AppService, WorkoutService, ProgressService],
})
export class AppModule { }
