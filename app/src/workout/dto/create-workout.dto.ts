import { IsString, IsNumber } from 'class-validator';

export class CreateWorkoutDto {
  @IsString()
  name: string;

  @IsNumber()
  duration: number;

  @IsString()
  type: string;
}
