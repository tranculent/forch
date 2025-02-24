import { IsString, IsNumber, Min, Max, Length, IsDate, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateWorkoutDto {
  @ApiProperty({ example: 'Morning Run', description: 'Workout name' })
  @IsString()
  @Length(3, 50, { message: 'Workout name must be between 3 and 50 characters.' })
  name: string;

  @ApiProperty({ example: 45, description: 'Duration in minutes' })
  @IsNumber()
  @Min(1, { message: 'Duration must be at least 1 minute.' })
  @Max(5760, { message: 'Duration cannot exceed 5760 minutes.' })
  duration: number;

  @ApiProperty({ example: 45, description: 'Distance in meters' })
  @IsNumber()
  @IsOptional()
  @Min(0, { message: 'Distance must be at least 1 meter.' })
  @Max(10000000, { message: 'Distance cannot exceed 10000000 meters.' })
  distance?: number;

  @ApiProperty({ example: 'km', description: 'Unit for distance (e.g., km, miles, meters)' })
  @IsOptional()
  @IsString()
  distanceUnit?: string;

  @ApiProperty({ example: 'Cardio', description: 'Type of workout' })
  @IsString()
  type: string;

  @ApiProperty({ example: '24/02/2025', description: 'Date of workout' })
  @IsDate()
  @Type(() => Date)
  date: Date;
}
