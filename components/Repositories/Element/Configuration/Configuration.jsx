import { useEffect, useState } from "react";
import styles from "./Configuration.module.scss";

export default function Configuration({
	repository,
	keyName,
	setAppSettings,
	setShowConfiguration,
}) {
	const [appRunning, setAppRunning] = useState(false);

	const rowId = `repository/${repository["user"]}/${repository["name"]}`;
	const configId = `${rowId}/config`;

	// Handle send command
	const handleSendCommand = async (command) => {
		const response = await fetch("http://localhost:37000/app/runCommand/", {
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
		console.log(`Start command response: `, response);
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

	const getVerticalPosition = () => {
		if (scrollY) {
			// Usual
			return scrollY;
		} else if (document.documentElement.clientHeight) {
			// IE
			return document.documentElement.scrollTop;
		} else if (document.body) {
			// IE quirks
			return document.body.scrollTop;
		}
	};

	const moveConfigurationToUserPosition = () => {
		// Get vertical position
		const verticalPosition = getVerticalPosition();

		// Move element
		const element = document.getElementById(configId);
		if (element) {
			element.style.top = `${verticalPosition}px`;
		}
	};

	// Move element as the user scrolls
	window.onscroll = function (e) {
		moveConfigurationToUserPosition();
	};

	useEffect(() => {
		// On instantiation move to the user position
		moveConfigurationToUserPosition();
	});

	return (
		<div className={styles.coverEverything} id={configId}>
			<div className={styles.whiteBox}>
				{/* Repository name */}
				<div className={styles.titleContainer}>
					<h4 className={styles.title}>{repository["name"]}</h4>
				</div>

				{/* Operations */}
				<div className={styles.buttons}>
					<button onClick={(event) => handleStartAppClick(event)}>
						Start app
					</button>
					<button onClick={(event) => handleStopAppClick(event)}>
						Stop app
					</button>
					<button onClick={(event) => handleRestartAppClick(event)}>
						Restart app
					</button>
					<button onClick={(event) => handleSetupAppClick(event)}>
						Setup app
					</button>
				</div>

				{/* Information */}
				<div className={styles.information}>
					<div className={styles.column1}>
						{/* App status */}
						<div className={styles.appStatus}>
							{(appRunning && <div className="success">App running</div>) || (
								<div className="danger">App not running</div>
							)}
						</div>
					</div>
					<div className={styles.column2}></div>
				</div>
			</div>

			{/* Close the window */}
			<button
				className={styles.closeButton}
				onClick={() => setShowConfiguration((prev) => !prev)}
			>
				Close
			</button>
		</div>
	);
}
