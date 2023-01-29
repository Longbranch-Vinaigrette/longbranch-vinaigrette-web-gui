import { useEffect, useState } from "react";
import useFancyUserRepositorySettings from "../../hooks/useFancyUserRepositorySettings";

import Element from "./Element/Element";
import SelectUser from "./SelectUser/SelectUser";
import PopUpWindow from "../lib/PopUpWindow";

export default function Repositories() {
	const [showSelectUserWindow, setShowSelectUserWindow] = useState(false);

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

	return (
		<div>
			{/* User */}
			<div>
				<p>Showing repositories of {selectedUser}</p>
				<button
					style={{ margin: "0px 0px 19px 0px" }}
					onClick={(e) => setShowSelectUserWindow((prev) => !prev)}
				>
					Select user
				</button>
				{showSelectUserWindow && (
					<PopUpWindow
						Component={SelectUser}
						showPopUp={showSelectUserWindow}
						setShowPopUp={setShowSelectUserWindow}
						args={{ ...fancyUserRepositorySettings }}
					/>
				)}
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
