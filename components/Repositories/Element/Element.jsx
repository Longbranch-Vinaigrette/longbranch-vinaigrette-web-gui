import { useEffect, useState } from "react";

import useDevtoolsBackendUrl from "../../../hooks/data/static/useDevtoolsBackendUrl";
import useAppSettings from "../../../hooks/user/apps/app/settings/useAppSettings";
import { sendRequest } from "../../../src/submodules/ComprehensiveStorage/requests/requests";
import Configuration from "./Configuration/Configuration";

export default function Element({
	repository,
	index,
	...fancyUserRepositorySettings
}) {
	if (!repository) {
		return;
	}
	const [showConfiguration, setShowConfiguration] = useState(false);
	const rowId = `repository/${repository["user"]}/${repository["name"]}`;
	const { updateRepository } = fancyUserRepositorySettings;

	const [backendUrl] = useDevtoolsBackendUrl();
	const { appInfo: appSettings } = useAppSettings(
		(repository && repository["path"]) || undefined
	);

	// Check if it's devtools compatible
	useEffect(() => {
		if (!appSettings) return;
		updateRepository(repository["user"], repository["name"], {
			dev_tools: true,
		});
	}, [appSettings]);

	// Functions
	const handleStartOnBootClick = async (event) => {
		// Update value
		updateRepository(repository["user"], repository["name"], {
			start_on_boot: !repository["start_on_boot"],
		});

		// Post data
		const result = await fetch(
			`${backendUrl}/app/enableOrDisableStartOnBoot/`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: new Blob(
					[
						JSON.stringify({
							user: repository["user"],
							name: repository["name"],
						}),
					],
					{
						type: "application/json",
					}
				),
			}
		)
			.then((res) => {
				const data = res.json();
				return data;
			})
			.catch((err) => {
				console.log(err);
				return err;
			});
	};
	
	// When the user clicks on configuration
	const handleConfigurationButtonClick = (event) => {
		setShowConfiguration((prev) => !prev);
	};

	return (
		<tr id={rowId}>
			<td>{repository["user"]}</td>
			<td>{repository["name"]}</td>
			<td>
				<input
					type="checkbox"
					checked={repository["start_on_boot"]}
					onClick={(event) => handleStartOnBootClick(event)}
				/>
			</td>
			<td>
				{/* Only if disabled will it let you check */}
				{(repository["dev_tools"] && (
					<div className="success" style={{ padding: "7px" }}>
						Yes
					</div>
				)) || (
					<div className="danger">
						No
					</div>
				)}
			</td>
			<td>
				<button
					type="button"
					onClick={(event) => handleConfigurationButtonClick(event)}
				>
					Configuration
				</button>
			</td>
			{showConfiguration && (
				<Configuration
					// Stuff
					repository={repository}
					index={index}
					setShowConfiguration={setShowConfiguration}
					appSettings={appSettings}
					// Fancy user repository settings
					{...fancyUserRepositorySettings}
				/>
			)}
		</tr>
	);
}
