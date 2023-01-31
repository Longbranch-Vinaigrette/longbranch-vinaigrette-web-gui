import { useState } from "react";

import styles from "./Operations.module.scss";

export default function Operations({
	backendUrl,
	repository,
	appSettings,
	...props
}) {
	// Check which commands does the app have
	const [hasStart] = useState(
		(appSettings &&
			appSettings["commands"] &&
			appSettings["commands"]["start"] &&
			true) ||
			false
	);
	const [hasStop] = useState(
		(appSettings &&
			appSettings["commands"] &&
			appSettings["commands"]["stop"] &&
			true) ||
			false
	);
	const [hasSetup] = useState(
		(appSettings &&
			appSettings["commands"] &&
			appSettings["commands"]["setup"] &&
			true) ||
			false
	);

	// Handle send command
	const handleSendCommand = async (command) => {
		const response = await fetch(`${backendUrl}/app/runCommand/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: new Blob(
				[
					JSON.stringify({
						path: repository["path"],
						commandName: command,
					}),
				],
				{
					type: "application/json",
				}
			),
		})
			.then((res) => {
				console.log(`Response: `, res);

				return res.json();
			})
			.catch((err) => console.log(`Error: `, err));
		return response;
	};

	// Specific commands
	const handleStartAppClick = (event) => {
		const res = handleSendCommand("start");
	};
	const handleStopAppClick = (event) => {
		const res = handleSendCommand("stop");
	};
	const handleRestartAppClick = (event) => {
		const res = handleSendCommand("restart");
	};
	const handleSetupAppClick = (event) => {
		const res = handleSendCommand("setup");
	};

	return (
		<div>
			<h4 style={{ margin: "5px" }}>Operations</h4>

			{/* Operations */}
			<div className={styles.buttons}>
				{/* Start */}
				<button
					onClick={(event) => handleStartAppClick(event)}
					disabled={!hasStart}
				>
					Start app
				</button>

				{/* Stop */}
				<button
					onClick={(event) => handleStopAppClick(event)}
					// Normally applications can be found by the start command, therefore
					// it's possible to stop the app with the start command.
					disabled={!hasStop && !hasStart}
				>
					Stop app
				</button>

				{/* Restart */}
				<button
					onClick={(event) => handleRestartAppClick(event)}
					disabled={!hasStart}
				>
					Restart app
				</button>

				{/* Setup */}
				<button
					onClick={(event) => handleSetupAppClick(event)}
					disabled={!hasSetup}
				>
					Setup app
				</button>
			</div>
		</div>
	);
}
