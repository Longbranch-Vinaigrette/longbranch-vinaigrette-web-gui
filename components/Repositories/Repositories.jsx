import { useEffect, useState } from "react";

// Components
import Element from "./Element/Element";
import SelectUser from "./SelectUser/SelectUser";
import PopUpWindow from "../lib/PopUpWindow";

// Hooks
import usePythonVersion from "../../hooks/system/python/usePythonVersion";
import useFancyUserRepositorySettings from "../../hooks/useFancyUserRepositorySettings";
import useInstalledPackages from "../../hooks/system/python/useInstalledPackages";

export default function Repositories() {
	const [showSelectUserWindow, setShowSelectUserWindow] = useState(false);
	const [atLeastOneIsDevToolsCompatible, setAtLeastOneIsDevToolsCompatible] =
		useState(false);

	const fancyUserRepositorySettings = useFancyUserRepositorySettings();
	const {
		users,
		selectedUser,
		setSelectedUser,
		userRepositories,
		updateRepository,
	} = fancyUserRepositorySettings;
	// Get python version and installed packages
	const { pythonVersion } = usePythonVersion();
	const { installedPackages } = useInstalledPackages();

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

	// Check if at least one of the repositories is devtools compatible
	useEffect(() => {
		// Validation
		if (!userRepositories) {
			return;
		}

		if (!userRepositories[selectedUser]) {
			return;
		}

		// Check if at least one of the is devtools compatible
		for (const repository of userRepositories[selectedUser]) {
			if (repository["dev_tools"]) {
				setAtLeastOneIsDevToolsCompatible(true);
				break;
			}
		}
	}, [userRepositories, selectedUser]);

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

			{/* If there exists repositories of the selected user */}
			{userRepositories && userRepositories[selectedUser] && (
				<div style={{ margin: "0px" }}>
					{/* Fast access to those who are devtools compatible */}
					{atLeastOneIsDevToolsCompatible && (
						<div>
							<div style={{ margin: "0px 0px 5px 0px" }}>
								DevTools compatible apps
							</div>
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
									{userRepositories[selectedUser].map((repository, index) => {
										if (repository["dev_tools"]) {
											return createElement(repository, index);
										}
									})}
								</tbody>
							</table>
						</div>
					)}

					{/* Reference/s:
					https://www.w3schools.com/html/html_tables.asp
					https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
					
					If you don't use tbody with tables, it will crash the app and throw
					'hydration failed' error.
					This guy is truly the MVP of html tables xd
					https://github.com/vercel/next.js/discussions/36754?ysclid=lcsdk9vmzz136486139*/}
					<div style={{ margin: "20px 0px 5px 0px" }}>Every repository</div>
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
							{userRepositories[selectedUser].map((repository, index) => {
								return createElement(repository, index);
							})}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
