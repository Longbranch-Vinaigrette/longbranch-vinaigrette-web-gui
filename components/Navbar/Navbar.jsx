import { useEffect, useState } from "react";
import useCollapseNavbar from "../../hooks/useCollapseNavbar";
import useDarkTheme from "../../hooks/useDarkTheme";
import styles from "./Navbar.module.scss";

export default function Navbar() {
	const [darkTheme, setDarkTheme] = useDarkTheme();
	const [collapseNavbar, setCollapseNavbar] = useCollapseNavbar();
	const [hidden, setHidden] = useState(true);

	// Switch collapse navbar value
	const switchCollapseNavbar = () => {
		setCollapseNavbar((prev) => !prev);
	};

	// Handle settings button click
	const handleSettingsButtonClick = (e) => {
		const url = window.location.href;
		const urlObject = new URL(url);
		const actualUrl = urlObject.origin;
		window.location.replace(`${actualUrl}/settings`);
	};

	useEffect(() => {
		setHidden(false);
	}, []);

	return (
		<div>
			{!hidden && (
				<div className={styles.navbar}>
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
							</div>
							<div>
								{/* Collapse navbar */}
								<div
									className={styles.left}
									onClick={() => switchCollapseNavbar()}
								>
									<div className={styles.arrow}></div>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
