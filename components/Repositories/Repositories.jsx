import { useEffect, useState } from "react";
import useRepositorySettings from "../../hooks/useRepositorySettings";

export default function Repositories() {
	const [name, setName] = useState("Perseverancia-company");
	const { repositorySettings, setRepositorySettings } = useRepositorySettings();

	const handleStartOnBootClick = async (event, repository, keyName) => {
		// Update value
		const newRepository = {
			...repository,
			// The opposite of the actual value
			start_on_boot: !repository["start_on_boot"],
		};
		setRepositorySettings((prev) => {
			return {
				...prev,
				[keyName]: {
					...newRepository,
				},
			};
		});

		// Post data
		const result = await fetch(
			"http://127.0.0.1:37002/RepositorySettings/upsert/",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: new Blob(
					[
						JSON.stringify({
							data: {
								...newRepository,
							},
							filter: {
								user: newRepository["user"],
								name: newRepository["name"],
							},
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

	return (
		<div>
			<h4>Repositories of {name}</h4>
			{/* Reference/s:
			https://www.w3schools.com/html/html_tables.asp
			https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
			
			If you don't use tbody with tables, it will crash the app and throw
			'hydration failed' error.
			This guy is truly the MVP of html tables xd
			https://github.com/vercel/next.js/discussions/36754?ysclid=lcsdk9vmzz136486139*/}
			<table>
				<tbody>
					<tr>
						<th>Username</th>
						<th>Repository name</th>
						<th>Start on boot</th>
						<th>Configure</th>
					</tr>

					{/* Create elements for every repository/app */}
					{Object.keys(repositorySettings).map((keyName, index) => {
						const item = repositorySettings[keyName];

						return (
							<tr>
								<td>{item["user"]}</td>
								<td>{item["name"]}</td>
								<td>
									<input
										type="checkbox"
										checked={item["start_on_boot"]}
										onClick={(event) =>
											handleStartOnBootClick(event, item, keyName)
										}
									/>
								</td>
								<td></td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
