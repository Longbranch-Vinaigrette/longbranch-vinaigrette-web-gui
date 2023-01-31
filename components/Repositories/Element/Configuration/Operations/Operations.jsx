import styles from "./Operations.module.scss";

export default function Operations({
	backendUrl,
	repository,
	appSettings,
	...props
}) {
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
			<h4 style={{margin: "5px"}}>Operations</h4>

			{/* Operations */}
			<div className={styles.buttons}>
				<button onClick={(event) => handleStartAppClick(event)}>
					Start app
				</button>
				<button onClick={(event) => handleStopAppClick(event)}>Stop app</button>
				<button onClick={(event) => handleRestartAppClick(event)}>
					Restart app
				</button>
				<button onClick={(event) => handleSetupAppClick(event)}>
					Setup app
				</button>
			</div>
		</div>
	);
}
