import { useState } from "react";
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

	// Functions
	const handleStartOnBootClick = async (event) => {
		// Update value
		updateRepository(repository["user"], repository["name"], {
			start_on_boot: !repository["start_on_boot"],
		});

		// Post data
		const result = await fetch(
			"http://127.0.0.1:37000/app/enableOrDisableStartOnBoot/",
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
		console.log(`Start on boot response: `, result);
	};

	const handleConfigurationButtonClick = (event) => {
		setShowConfiguration((prev) => !prev);
	};

	// Check whether the app is DevTools compatible or not
	const handleCheckDevToolsCompatibility = async (event) => {
		// Post data
		const result = await fetch(
			"http://127.0.0.1:37000/app/checkDevToolsCompatibility/",
			{
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
			
		// Update repository
		console.log(`Check DevTools compatibility response: `, result);
		console.log(`Data: `, result["devtoolsCompatible"]);
		updateRepository(repository["user"], repository["name"], {
			dev_tools: result["devtoolsCompatible"],
		});
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
				{(repository["dev_tools"] && <div className="success">Yes</div>) || (
					<div className="danger">
						No
						<button
							type="button"
							onClick={(event) => handleCheckDevToolsCompatibility(event)}
						>
							Check
						</button>
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
					// Fancy user repository settings
					{...fancyUserRepositorySettings}
				/>
			)}
		</tr>
	);
}
