import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../../styles/WorkoutLogging.module.scss";

const workoutTypes = [
	{ name: "Running", requiresDistance: true },
	{ name: "Cycling", requiresDistance: true },
	{ name: "Swimming", requiresDistance: true },
	{ name: "Strength Training", requiresDistance: false },
	{ name: "Yoga", requiresDistance: false },
	{ name: "Tennis", requiresDistance: false },
];

export default function WorkoutLogging() {
	const [form, setForm] = useState({
		name: "",
		type: "",
		distance: 0, // Defaulting to number
		distanceUnit: "kilometers",
		minutes: 0,
		hours: 0,
		date: "",
	});

	const today = new Date().toISOString().split("T")[0];
	const fiveYearsAgo = new Date();
	fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
	const minDate = fiveYearsAgo.toISOString().split("T")[0];

	const [message, setMessage] = useState("");
	const [errors, setErrors] = useState<{
		name?: string;
		type?: string;
		duration?: string;
		date?: string;
		distance?: string;
		distanceUnit?: string;
	}>({});
	const router = useRouter();

	const selectedWorkout = workoutTypes.find((w) => w.name === form.type);
	const requiresDistance = selectedWorkout?.requiresDistance || false;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		let { name, value } = e.target;

		setForm((prev) => ({
			...prev,
			[name]: name === "distance" || name === "minutes" || name === "hours" ? Number(value) || 0 : value,
		}));
	};

	const validate = () => {
		let newErrors: {
			name?: string;
			type?: string;
			duration?: string;
			date?: string;
			distance?: string;
		} = {};
		if (!form.name) newErrors.name = "Workout name is required.";
		if (!form.type) newErrors.type = "Workout type is required.";
		if (!form.minutes && !form.hours) newErrors.duration = "Duration is required.";
		if (!form.date) newErrors.date = "Date is required.";
		if (requiresDistance && !form.distance) newErrors.distance = "Distance is required.";

		const selectedDate = new Date(form.date);
		selectedDate.setHours(0, 0, 0, 0);
		const todaysDate = new Date();
		todaysDate.setHours(0, 0, 0, 0);

		// Check if the date is valid and within range
		if (isNaN(selectedDate.getTime())) {
			newErrors.date = "Invalid date format.";
		} else {
			if (selectedDate > todaysDate) newErrors.date = "Future dates are not allowed.";
			if (selectedDate.getFullYear() < 2000) newErrors.date = "Date must be after 2000.";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		if (!validate()) return;

		const totalMinutes = (Number(form.hours) || 0) * 60 + (Number(form.minutes) || 0);

		let workoutData: any = {
			name: form.name,
			duration: totalMinutes,
			type: form.type,
			date: form.date ? new Date(form.date) : null,
		};
	
		// Only include distance fields if required
		if (requiresDistance) {
			workoutData.distance = form.distance;
			workoutData.distanceUnit = form.distanceUnit;
		}

		try {
			await axios.post("http://localhost:5000/workouts", workoutData);
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
				<input
					className={styles.input}
					type="text"
					name="name"
					value={form.name}
					onChange={handleChange}
				/>
				{errors.name && <p className={styles.error}>{errors.name}</p>}

				<label>Workout Type</label>
				<select className={styles.select} name="type" value={form.type} onChange={handleChange}>
					<option value="">Select type</option>
					{workoutTypes.map((type) => (
						<option key={type.name} value={type.name}>{type.name}</option>
					))}
				</select>
				{errors.type && <p className={styles.error}>{errors.type}</p>}

				<label>Duration</label>
				<div className={styles.row}>
					<input
						className={styles.input}
						type="number"
						name="hours"
						value={form.hours === 0 ? "" : form.hours}
						onChange={handleChange}
						placeholder="Hours"
					/>
					<input
						className={styles.input}
						type="number"
						name="minutes"
						value={form.minutes === 0 ? "" : form.minutes}
						onChange={handleChange}
						placeholder="Minutes"
					/>
				</div>
				{errors.duration && <p className={styles.error}>{errors.duration}</p>}

				{requiresDistance && (
					<>
						<label>Distance</label>
						<div className={styles.distanceInput}>
							<input
								className={styles.input}
								type="number"
								name="distance"
								value={form.distance === 0 ? "" : form.distance}
								onChange={handleChange}
								placeholder="Enter distance"
								min="0.1"
								step="0.1"
							/>
							<select
								className={styles.unitSelect}
								name="distanceUnit"
								value={form.distanceUnit}
								onChange={handleChange}
							>
								<option value="meters">meters</option>
								<option value="kilometers">kilometers</option>
								<option value="miles">miles</option>
							</select>
						</div>
						{errors.distance && <p className={styles.error}>{errors.distance}</p>}
					</>
				)}

				<input
					type="date"
					name="date"
					value={form.date}
					onChange={handleChange}
					max={today}
					min={minDate}  // 🔥 Restricts selection to the last 5 years
					className={styles.dateInput}
				/>
				{errors.date && <p className={styles.error}>{errors.date}</p>}

				<button className={styles.button} type="submit">Submit Workout</button>
			</form>
			{message && <p className={styles.successMessage}>{message}</p>}
		</div>
	);
}
