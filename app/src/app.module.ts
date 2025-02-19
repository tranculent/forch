import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkoutModule } from './workout/workout.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI!),
    WorkoutModule
  ],
  controllers: [AppController, ],
  providers: [AppService],
})
export class AppModule {}
