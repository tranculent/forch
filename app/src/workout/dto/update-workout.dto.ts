import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWorkoutDto } from './create-workout.dto';

export class UpdateWorkoutDto extends PartialType(CreateWorkoutDto) {
  @ApiProperty({ example: 'Morning Run Updated', description: 'Updated workout name', required: false })
  name?: string;

  @ApiProperty({ example: 50, description: 'Updated duration in minutes', required: false })
  duration?: number;

  @ApiProperty({ example: 'Strength Training', description: 'Updated type of workout', required: false })
  type?: string;
}
