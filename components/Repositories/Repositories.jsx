import { useEffect, useState } from "react";
import useFancyUserRepositorySettings from "../../hooks/useFancyUserRepositorySettings";

import Element from "./Element/Element";

export default function Repositories() {
	const fancyUserRepositorySettings = useFancyUserRepositorySettings();
	const {
		users,
		selectedUser,
		setSelectedUser,
		userRepositories,
		updateRepository,
	} = fancyUserRepositorySettings;

	const createElement = (repository, index) => {
		return (
			<Element
				// Stuff
				repository={repository}
				index={index}
				// Repository settings
				{...fancyUserRepositorySettings}
			/>
		);
	};

	useEffect(() => {
		console.log(`User repositories: `, userRepositories);
		console.log(`Selected user: `, selectedUser);
		console.log(`Its user repositories: `, userRepositories[selectedUser]);
	}, [userRepositories]);

	return (
		<div>
			{/* User */}
			<div>
				<p>Showing repositories of {selectedUser}</p>
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
					{userRepositories &&
						userRepositories[selectedUser] &&
						userRepositories[selectedUser].map((repository, index) => {
							return createElement(repository, index);
						})}
				</tbody>
			</table>
		</div>
	);
}
