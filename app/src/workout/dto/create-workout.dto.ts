import { IsString, IsNumber, Min, Max, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkoutDto {
  @ApiProperty({ example: 'Morning Run', description: 'Workout name' })
  @IsString()
  @Length(3, 50, { message: 'Workout name must be between 3 and 50 characters.' })
  name: string;

  @ApiProperty({ example: 45, description: 'Duration in minutes' })
  @IsNumber()
  @Min(1, { message: 'Duration must be at least 1 minute.' })
  @Max(300, { message: 'Duration cannot exceed 300 minutes.' })
  duration: number;

  @ApiProperty({ example: 'Cardio', description: 'Type of workout' })
  @IsString()
  type: string;
}
