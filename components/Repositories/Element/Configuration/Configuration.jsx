import { useEffect, useState } from "react";
import useAppStatus from "../../../../hooks/apps/app/useAppStatus";

import useMoveElementOnScroll from "../../../../hooks/css/positioning/useMoveElementOnScroll";
import styles from "./Configuration.module.scss";
import EnvVariables from "./EnvVariables/EnvVariables";
import Operations from "./Operations/Operations";

export default function Configuration({
	repository,
	index,
	setShowConfiguration,
	...fancyUserRepositorySettings
}) {
	const [appSettings, setAppSettings] = useState({});
	const [envVariablesConfig, setEnvVariablesConfig] = useState({});
	const [selectedTab, setSelectedTab] = useState("information");

	const backendUrl = "http://localhost:37000";
	const rowId = `repository/${repository["user"]}/${repository["name"]}`;
	// Hook to check app status
	const { appStatus, updateAppStatus } = useAppStatus({
		path: repository["path"],
	});
	// Hook to fetch repository settings
	const {
		users,
		selectedUser,
		setSelectedUser,
		userRepositories,
		updateRepository,
	} = fancyUserRepositorySettings;

	// Move element along the user
	const configId = `${rowId}/config`;
	useMoveElementOnScroll(configId);

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

				{/* Tabs */}
				<nav className={styles.tabs}>
					{/* Information tab */}
					<div
						// How to use two classes(I didn't know before)
						// className={`${styles.tabElement} ${styles.tabElementSelected}`}
						className={
							(selectedTab === "information" && styles.tabElementSelected) ||
							styles.tabElement
						}
						onClick={() => setSelectedTab("information")}
					>
						Information
					</div>

					{/* Operations(start, stop, setup, restart) */}
					<div
						className={
							(selectedTab === "operations" && styles.tabElementSelected) ||
							styles.tabElement
						}
						onClick={() => setSelectedTab("operations")}
					>
						Opeartions
					</div>

					{/* Environment variables
							It will only be shown if "appSettings" has the field "env" and "variables"
							*/}
					{appSettings &&
						appSettings["env"] &&
						appSettings["env"]["variables"] && (
							<div
								className={
									(selectedTab === "dotenv" && styles.tabElementSelected) ||
									styles.tabElement
								}
								onClick={() => setSelectedTab("dotenv")}
							>
								Environment variables
							</div>
						)}
				</nav>

				{/* Select tab */}
				{(selectedTab === "information" && (
					<div>
						{/* Information */}
						<div className={styles.information}>
							<div className={styles.column1}>
								{/* App status */}
								<div className={styles.appStatus}>
									{(appStatus && (
										<div className="success">App running</div>
									)) || (
										<div>
											<span style={{ margin: "0px 10px 0px 0px" }}>Status</span>
											<span className="danger">App not running</span>
										</div>
									)}
								</div>
							</div>
							<div className={styles.column2}></div>
						</div>
					</div>
				)) ||
					(selectedTab === "dotenv" && (
						<div>
							{/* Environment variables
							It will only be shown if "appSettings" has the field "env" and "variables"
							*/}
							{appSettings &&
								appSettings["env"] &&
								appSettings["env"]["variables"] && (
									<EnvVariables
										repository={repository}
										appSettings={appSettings}
									/>
								)}
						</div>
					)) ||
					(selectedTab === "operations" && (
						<div>
							{/* Operations */}
							<Operations
								backendUrl={backendUrl}
								repository={repository}
								appSettings={appSettings}
								appStatus={appStatus}
								updateStatus={appStatus}
							/>
						</div>
					))}
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
