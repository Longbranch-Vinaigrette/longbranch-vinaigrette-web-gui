import { useEffect, useState } from "react";
import useMoveElementOnScroll from "../../../../hooks/css/positioning/useMoveElementOnScroll";
import styles from "./Configuration.module.scss";

export default function Configuration({
	repository,
	index,
	setShowConfiguration,
	...fancyUserRepositorySettings
}) {
	const [appRunning, setAppRunning] = useState(false);
	const [appSettings, setAppSettings] = useState({});
	const [envVariablesConfig, setEnvVariablesConfig] = useState({});

	const backendUrl = "http://localhost:37000";
	const rowId = `repository/${repository["user"]}/${repository["name"]}`;
	const configId = `${rowId}/config`;
	const {
		users,
		selectedUser,
		setSelectedUser,
		userRepositories,
		updateRepository,
	} = fancyUserRepositorySettings;

	// Move element along the user
	useMoveElementOnScroll(configId);

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

	// Handle change command input
	const handleChangeCommandInput = (e) => {
		const { name, value } = e.target;
		setEnvVariablesConfig((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	// Handle submit env variables
	const handleSubmitEnvVariables = (e) => {
		// Prevent default
		e.preventDefault();

		// Send env variables
		fetch(`${backendUrl}/app/dot_env/upsertEnvVariables/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: new Blob([
				JSON.stringify({
					path: repository["path"],
					env: envVariablesConfig,
				}),
			]),
		})
			.then((res) => {
				return res.json();
			})
			.catch((err) => {
				console.log(`Error: `, err);
			});
	};

	// Fetch app settings
	useEffect(() => {
		(async () => {
			const res = await fetch(`${backendUrl}/app/getSettings/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: new Blob(
					[
						JSON.stringify({
							path: repository["path"],
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
					console.log(err);
					return undefined;
				});

			if (res) {
				// Set the data
				setAppSettings((prev) => {
					return {
						...prev,
						// The stuff is in data
						...res["data"],
					};
				});
			}
		})();
	}, []);

	return (
		<div className={styles.coverEverything} id={configId}>
			<div className={styles.whiteBox} style={{ padding: "5px" }}>
				{/* Repository name */}
				<div className={styles.titleContainer}>
					<h3 className={styles.title}>
						{selectedUser} | {repository["name"]}
					</h3>
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
				<h4 style={{ marginBottom: "0px", marginTop: "0px" }}>Information</h4>
				<div className={styles.information}>
					<div className={styles.column1}>
						{/* App status */}
						<div className={styles.appStatus}>
							{(appRunning && <div className="success">App running</div>) || (
								<div>
									<span style={{ margin: "0px 10px 0px 0px" }}>Status</span>
									<span className="danger">App not running</span>
								</div>
							)}
						</div>
					</div>
					<div className={styles.column2}></div>
				</div>

				{/* Environment variables
				It will only be shown if "appSettings" has the field "env" and "variables"
				*/}
				{appSettings &&
					appSettings["env"] &&
					appSettings["env"]["variables"] && (
						<div>
							<h4 style={{ marginBottom: "0px" }}>
								Environment variables(.env)
							</h4>
							<form action="submit">
								<table style={{ margin: "10px 0px 10px 0px" }}>
									<tbody>
										{/* Titles */}
										<tr>
											<th>Formal name</th>
											<th>Description</th>
											<th>Input</th>
										</tr>

										{/* Configuration */}
										{appSettings["env"]["variables"].map((envVar) => {
											return (
												<tr>
													{/* Name of the variables */}
													<td>{envVar["formalName"]}</td>

													{/* Variable description */}
													<td>
														<label htmlFor={envVar["varName"]}>
															{envVar["descriptionList"] &&
																envVar["descriptionList"].map((message) => {
																	return <div>{message}</div>;
																})}
														</label>
													</td>

													{/* Set environment variable */}
													<td>
														<textarea
															name={envVar["varName"]}
															id=""
															cols="30"
															rows="10"
															value={
																(envVariablesConfig &&
																	envVariablesConfig[envVar["varName"]]) ||
																""
															}
															onChange={(e) => handleChangeCommandInput(e)}
														></textarea>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>

								{/* Submit */}
								<button
									style={{ margin: "0px" }}
									onClick={(e) => handleSubmitEnvVariables(e)}
									type="submit"
								>
									Submit
								</button>
							</form>
						</div>
					)}
				{/* End env input form */}
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
