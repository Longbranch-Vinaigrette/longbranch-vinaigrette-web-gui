import useDarkTheme from "../hooks/useDarkTheme";
import styles from "./Navbar.module.scss";

export default function Navbar() {
	const [darkTheme, setDarkTheme] = useDarkTheme();

	return (
		<div className={styles.red}>
			<div>Navbar</div>
			<div>Dark theme enabled: {darkTheme}</div>
		</div>
	);
}
