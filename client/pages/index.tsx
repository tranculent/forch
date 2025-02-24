import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import styles from "../styles/Home.module.scss";

interface Workout {
  _id: string;
  name: string;
  duration: number;
  distance: number;
  distanceUnit: string;
  type: string;
  date: Date;
}

export default function Home() {
  const [dateTime, setDateTime] = useState<string | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDateTime(new Date().toLocaleString());
    const interval = setInterval(() => setDateTime(new Date().toLocaleString()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/workouts");
        setWorkouts(response.data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkouts();
  }, []);

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Workout Journal</h1>
      <p className={styles.date}>{dateTime ?? "Loading..."}</p>

      <div className={styles.workouts}>
        <h2>Recent Workouts</h2>
        {loading ? (
          <p>Loading workouts...</p>
        ) : workouts.length === 0 ? (
          <p>No workouts logged yet.</p>
        ) : (
          <ul className={styles.workoutList}>
            {workouts.map((workout) => (
              <li key={workout._id} className={styles.workoutItem}>
                <h3>{workout.name}</h3>
                <p>📅 Date: {new Date(workout.date).toLocaleDateString()}</p>
                <p>⏳ Duration: {workout.duration} mins</p>
                {workout.type && <p>💪 Type: {workout.type}</p>}
                {workout.distance > 0 && (
                  <p>📏 Distance: {workout.distance} {workout.distanceUnit || "km"}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>


      <Link href="/workouts/new">
        <button className={styles.button}>Log a Workout</button>
      </Link>
    </div>
  );
}
