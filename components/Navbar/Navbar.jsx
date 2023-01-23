import { useEffect, useState } from "react";
import useCollapseNavbar from "../../hooks/useCollapseNavbar";
import useDarkTheme from "../../hooks/useDarkTheme";
import styles from "./Navbar.module.scss";

export default function Navbar() {
	const [darkTheme, setDarkTheme] = useDarkTheme();
	const [collapseNavbar, setCollapseNavbar] = useCollapseNavbar();
	const [hidden] = useState("hidden");

	// Switch collapse navbar value
	const switchCollapseNavbar = () => {
		setCollapseNavbar((prev) => !prev);
	};

	return (
		<div className={styles.navbar}
			// Make it be hidden from the start, when the website loads change it if it's enabled
			hidden={hidden}
		>
			{collapseNavbar ? (
				<div
					className={styles.navbarCollapsed}
					onClick={() => switchCollapseNavbar()}
				>
					{/* Expand navbar */}
					<div className={styles.right}>
						<div className={styles.arrow}></div>
					</div>
				</div>
			) : (
				<div className={styles.main}>
					{/* Navbar Elements */}
					<div>
						<h3>Navbar</h3>
						<div>Dark theme enabled: {darkTheme ? "true" : "false"}</div>
						<div>Collapse navbar: {collapseNavbar ? "true" : "false"}</div>
					</div>
					<div>
						{/* Collapse navbar */}
						<div className={styles.left} onClick={() => switchCollapseNavbar()}>
							<div className={styles.arrow}></div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
