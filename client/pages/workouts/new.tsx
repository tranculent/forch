import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../../styles/WorkoutLogging.module.scss";

const workoutTypes = ["Cardio", "Strength", "Mobility", "Endurance", "Flexibility"];

export default function WorkoutLogging() {
	const [form, setForm] = useState({ name: "", type: "", minutes: "", hours: "" });
	const [message, setMessage] = useState("");
	const [errors, setErrors] = useState<{ name?: string; type?: string; duration?: string }>({});
	const router = useRouter();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const validate = () => {
		let newErrors: { name?: string; type?: string; duration?: string } = {};
		if (!form.name) newErrors.name = "Workout name is required.";
		if (!form.type) newErrors.type = "Workout type is required.";
		if (!form.minutes && !form.hours) newErrors.duration = "Duration is required.";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validate()) return;

		const totalMinutes = (Number(form.hours) || 0) * 60 + (Number(form.minutes) || 0);

		try {
			await axios.post("http://localhost:5000/workouts", {
				name: form.name,
				duration: totalMinutes,
				type: form.type,
			});
			setMessage("Workout logged successfully!");
			setTimeout(() => router.push("/"), 1500);
		} catch (error) {
			setMessage("Error logging workout.");
		}
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Log a Workout</h1>

			<form className={styles.form} onSubmit={handleSubmit}>
				<label>Workout Name</label>
				<input className={[styles.input, styles.workoutNameField].join(" ")} type="text" name="name" value={form.name} onChange={handleChange} />
				<label>Workout Type</label>
				<select className={styles.select} name="type" value={form.type} onChange={handleChange}>
					<option value="">Select type</option>
					{workoutTypes.map((type) => (
						<option key={type} value={type}>{type}</option>
					))}
				</select>
				<label>Duration</label>
				<div className={styles.row}>
					<input className={styles.input} type="number" name="hours" value={form.hours} onChange={handleChange} placeholder="Hours" />
					<input className={styles.input} type="number" name="minutes" value={form.minutes} onChange={handleChange} placeholder="Minutes" />
				</div>

				<button className={styles.button} type="submit">Submit Workout</button>
			</form>
			
			{message && <p className={styles.successMessage}>{message}</p>}
		</div>

	);
}
