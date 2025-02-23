import "../styles/globals.scss";
import styles from "../styles/Card.module.scss";
import Navbar from "../components/Navbar";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<div className={styles.card}>
			<Navbar />
			<Component {...pageProps} />
		</div>
	);
}

export default MyApp;
