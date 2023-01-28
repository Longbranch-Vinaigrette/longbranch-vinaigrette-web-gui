import styles from "./TopNavbar.module.scss";

export default function TopNavbar() {
	const redirect = (e, whereTo) => {
		const url = window.location.href;
		const urlObject = new URL(url);
		const actualUrl = urlObject.origin;
		window.location.replace(`${actualUrl}/${whereTo}`);
	};

	return (
		<div>
			<nav className={styles.nav}>
				{/* Home link */}
				<h4
					className={styles.navbarElement}
					onClick={(e) => redirect(e, "home")}
				>
					Home
				</h4>
				
				{/* Settings link */}
				<h4
					className={styles.navbarElement}
					onClick={(e) => redirect(e, "settings")}
				>
					Settings
				</h4>
			</nav>
		</div>
	);
}
