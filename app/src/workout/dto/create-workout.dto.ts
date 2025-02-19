export class CreateWorkoutDto {
    name: string;
    duration: number;
    type: 'strength' | 'cardio' | 'mobility';
  }
  