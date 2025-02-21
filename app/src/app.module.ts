import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { WorkoutController } from './workout/workout.controller';
import { AppService } from './app.service';
import { WorkoutService } from './workout/workout.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkoutModule } from './workout/workout.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined. Please check your environment variables.");
}

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(MONGO_URI),
    WorkoutModule
  ],
  controllers: [AppController, WorkoutController],
  providers: [AppService, WorkoutService],
})
export class AppModule {}
