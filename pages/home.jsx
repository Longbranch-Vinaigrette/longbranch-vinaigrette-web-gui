import { useEffect } from "react";

import styles from "../styles/home.module.scss";
import Repositories from "../components/Repositories/Repositories";

export default function Home() {
	useEffect(() => {
		// Change title
		document.title = "Perseverancia | Home";
	}, []);

	return (
		<div>
			<div className={styles.controlPanel}>
				<h3>Control panel</h3>
				<Repositories />
			</div>
		</div>
	);
}
