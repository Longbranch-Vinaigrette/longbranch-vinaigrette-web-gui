import { useEffect, useState } from "react";
import useRepositorySettings from "../../hooks/useRepositorySettings";
import Element from "./Element/Element";

export default function Repositories() {
	const [users, setUsers] = useState([]);
	const { repositorySettings, setRepositorySettings, setAppSettings } =
		useRepositorySettings();

	useEffect(() => {
		(async () => {
			const res = await fetch("http://localhost:37000/user/getLocalUsers/", {
				method: "GET",
			})
				.then((res) => {
					return res.json();
				})
				.catch((err) => console.log("Error: ", err));

			if (res) {
				console.log(`Users: `, res["users"]);
				setUsers(res["users"]);
			}
		})();
	}, []);

	return (
		<div>
			{/* User */}
			<div>
				<p>Showing repositories of {users && users[0]}</p>
			</div>

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
						<th>DevTools</th>
						<th>Configure</th>
					</tr>

					{/* Create elements for every repository/app */}
					{Object.keys(repositorySettings).map((keyName, index) => {
						const item = repositorySettings[keyName];

						return (
							<Element
								repository={item}
								keyName={keyName}
								setAppSettings={setAppSettings}
							/>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
