import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkoutDto } from './create-workout.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class UpdateWorkoutDto extends PartialType(CreateWorkoutDto) {
  @ApiProperty({ example: 'Morning Run Updated', description: 'Updated workout name', required: false })
  name?: string;

  @ApiProperty({ example: 50, description: 'Updated duration in minutes', required: false })
  duration?: number;

  @ApiProperty({ example: 'Strength Training', description: 'Updated type of workout', required: false })
  type?: string;

  @ApiProperty({ example: 45, description: 'Distance in meters', required: false })
  distance?: number;

  @ApiProperty({ example: 'miles', description: 'Unit for distance (e.g., km, miles, meters)', required: false })
  distanceUnit?: string;
  
  @ApiProperty({ example: Date.now(), description: 'Date of workout', required: true })
  date: Date;
}
