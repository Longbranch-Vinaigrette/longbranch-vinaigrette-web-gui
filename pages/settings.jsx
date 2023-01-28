import { useState } from "react";
import styles from "../styles/settings.module.scss";

export default function Settings() {
	const [userInput, setUserInput] = useState({});

	const handleSubmitButtonClick = (e) => {
		e.preventDefault();
	};

	const handleUserInputChange = (e) => {
		const { name, value } = e.target;
		setUserInput(() => {
			return {
				...input,
				[name]: value,
			};
		});
	};

	return (
		<div className={styles.margin}>
			<h2>Settings</h2>
			<div className={styles.fullForm}>
				<form action="submit" className={styles.form}>
					<div className={styles.labels}>
						{/* Labels are inline elements, and the display: table works with block elements */}
						<div>
							<label htmlFor="user">Username</label>
						</div>
						<div>
							<label htmlFor="token">Token</label>
						</div>
					</div>
					<div className={styles.inputs}>
						{/* The same goes for input elements */}
						<div>
							<input
								type="text"
								name="user"
								onChange={(e) => handleUserInputChange(e)}
							/>
						</div>
						<div>
							<input
								type="text"
								name="token"
								onChange={(e) => handleUserInputChange(e)}
							/>
						</div>
					</div>
				</form>
				<button onClick={(e) => handleSubmitButtonClick(e)}>Submit</button>
			</div>
		</div>
	);
}
