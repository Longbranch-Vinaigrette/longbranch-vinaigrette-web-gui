import { useState, useEffect } from "react";

export default function EnvVariables({ repository, appSettings, ...args }) {
	const [envVariablesConfig, setEnvVariablesConfig] = useState({});

	const backendUrl = "http://localhost:37000";

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
	const handleSubmitEnvVariables = async (e) => {
		// Prevent default
		e.preventDefault();

		// Send env variables
		const res = fetch(`${backendUrl}/app/dot_env/upsertEnvVariables/`, {
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
		console.log(`Response: `, res);
	};

	// Fetch project dotenv data
	useEffect(() => {
		(async () => {
			const res = await fetch(`${backendUrl}/app/dot_env/getDotEnvData/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: new Blob([JSON.stringify({ path: repository["path"] })], {
					type: "application/json",
				}),
			})
				.then((res) => {
					return res.json();
				})
				.catch((err) => console.log(err));
			
			if (res) {
				setEnvVariablesConfig((prev) => {
					return {
						...prev,
						...res["data"],
					};
				});
			}
		})();
	}, []);

	return (
		<div>
			<h4 style={{ marginBottom: "0px" }}>Environment variables(.env)</h4>
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
	);
}
