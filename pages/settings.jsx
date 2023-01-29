import { useEffect, useState } from "react";
import styles from "../styles/settings.module.scss";

export default function Settings() {
	const [userInput, setUserInput] = useState({});

	const requestKeys = ["github_username", "github_token"];

	const handleSubmitButtonClick = async (e) => {
		e.preventDefault();
		console.log(`User input: `, userInput);
		const response = await fetch("http://localhost:37002/Settings/upsert/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: new Blob([JSON.stringify(userInput)], {
				type: "application/json",
			}),
		})
			.then((res) => {
				return res.json();
			})
			.catch((err) => console.log(`Error: `, err));
		return response;
	};

	const handleUserInputChange = (e) => {
		const { name, value } = e.target;
		setUserInput((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	// Fetch previous data
	useEffect(() => {
		(async () => {
			// Fetch settings data
			const response = await fetch("http://localhost:37002/Settings/get/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: new Blob(
					[
						JSON.stringify({
							keys: requestKeys,
						}),
					],
					{
						type: "application/json",
					}
				),
			})
				.then((res) => {
					return res.json();
				})
				.catch((err) => {
					console.log(`Error: `, err);
				});
			
			// Resopnse might be empty if there was an error.
			if (response) {
				// Set the input to the response data
				setUserInput((prev) => {
					const resData = response["data"];
					return {
						...prev,
						...resData,
					};
				});
			}
		})();
	}, []);

	return (
		<div className={styles.margin}>
			<h2>Settings</h2>
			<div className={styles.fullForm}>
				<form action="submit" className={styles.form}>
					<div className={styles.labels}>
						{/* Labels are inline elements, and the display: table works with block elements */}
						<div>
							<label htmlFor="github_username">Username</label>
						</div>
						<div>
							<label htmlFor="github_token">Token</label>
						</div>
					</div>
					<div className={styles.inputs}>
						{/* The same goes for input elements */}
						<div>
							<input
								type="text"
								name="github_username"
								value={userInput["github_username"]}
								onChange={(e) => handleUserInputChange(e)}
							/>
						</div>
						<div>
							<input
								type="text"
								name="github_token"
								value={userInput["github_token"]}
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
