export const WorkoutSwaggerExamples = {
    createWorkout: {
        examples: {
            example1: {
                summary: 'Basic Cardio Workout',
                description: 'A simple running workout.',
                value: {
                    name: 'Morning Run',
                    duration: 45,
                    type: 'Cardio',
                },
            },
            example2: {
                summary: 'Strength Training',
                description: 'A weightlifting workout.',
                value: {
                    name: 'Leg Day',
                    duration: 60,
                    type: 'Strength Training',
                },
            },
        },
    },

    updateWorkout: {
        examples: {
            example1: {
                summary: 'Increase Workout Duration',
                description: 'Extending a workout duration.',
                value: {
                    duration: 60,
                },
            },
        },
    },
};
  