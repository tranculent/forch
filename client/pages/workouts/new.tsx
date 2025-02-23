import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../../styles/WorkoutLogging.module.scss";

export default function WorkoutLogging() {
  const [form, setForm] = useState({ name: "", duration: "", type: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/workouts", {
        name: form.name,
        duration: Number(form.duration),
        type: form.type,
      });
      setMessage("Workout logged successfully!");
      setTimeout(() => router.push("/"), 1500);
    } catch (error) {
      setMessage("Error logging workout.");
    }
  };

  return (
    <div className="container">
      <h1 className={styles.title}>Log a Workout</h1>

      <form className="form" onSubmit={handleSubmit}>
        <label>Workout Name</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} required />

        <label>Duration (minutes)</label>
        <input type="number" name="duration" value={form.duration} onChange={handleChange} required />

        <label>Type</label>
        <input type="text" name="type" value={form.type} onChange={handleChange} required />

        <button type="submit">Submit Workout</button>
      </form>

      {message && <p className={styles.successMessage}>{message}</p>}
    </div>
  );
}
