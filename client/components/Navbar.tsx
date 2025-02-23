import Link from "next/link";
import styles from "../styles/Navbar.module.scss";

export default function Navbar() {
	return (
		<nav className={styles.navbar}>
			<Link href="/" className={styles.link}>Home</Link>
			<Link href="/workouts/new" className={styles.link}>Log Workout</Link>
			<Link href="/dashboard" className={styles.link}>Progress Dashboard</Link>
		</nav>
	);
}
