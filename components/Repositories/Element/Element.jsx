import { useEffect } from "react";

export default function Element({
	repository,
	keyName,
	setAppSettings,
}) {
	const handleStartOnBootClick = async (event) => {
		try {
			// Update value
			setAppSettings(keyName, {
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
			console.log(`Response: `, result);
		} catch (err) {
			
		}
	};

	const handleConfigurationButtonClick = (event) => {
		
	};
	
	return (
		<tr>
			<td>{repository["user"]}</td>
			<td>{repository["name"]}</td>
			<td>
				<input
					type="checkbox"
					checked={repository["start_on_boot"]}
					onClick={(event) =>
						handleStartOnBootClick(event)
					}
				/>
			</td>
			<td>
				<button
					type="button"
					onClick={(event) =>
						handleConfigurationButtonClick(event)
					}
				>
					Configuration
				</button>
			</td>
		</tr>
	);
}
