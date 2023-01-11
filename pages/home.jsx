import { useEffect } from "react";
import styles from "../styles/home.module.scss";

export default function Home() {
	useEffect(() => {
		// Change title
		document.title = "Perseverancia | Home";
	}, []);

	return (
		<div>
			<div className={styles.controlPanel}>
				<h3>Control panel</h3>
			</div>
		</div>
	);
}
