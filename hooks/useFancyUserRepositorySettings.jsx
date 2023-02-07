import { useEffect, useState } from "react";
import useDevtoolsBackendUrl from "./data/static/useDevtoolsBackendUrl";
import useSelectedUser from "./user/useSelectedUser";
import useUsersList from "./user/useUsersList";

export default function useFancyUserRepositorySettings() {
	const [users, setUsers] = useState([]);
	const [userRepositories, setUserRepositories] = useState({});
	const [selectedUser, setSelectedUser] = useSelectedUser();

	const [usersList] = useUsersList();
	const [serverUrl] = useDevtoolsBackendUrl();

	// Update a repository
	const updateRepository = (user, repositoryName, data) => {
		setUserRepositories((prev) => {
			const result = prev[user].map((refRepository, index) => {
				// This is the one we are looking for
				if (refRepository["name"] == repositoryName) {
					// Clone it
					let repository = structuredClone(refRepository);

					// Replace repository data with the new data
					repository = {
						...repository,
						...data,
					};
					return repository;
				}
				return refRepository;
			});

			const preview = {
				// Insert previous data of other users
				...prev,
				// Replace the user for result
				[user]: result,
			};
			return preview;
		});
	};

	// After we get the local users, we can retrieve the repositories for each user,
	// the question is how?.
	useEffect(() => {
		// Check if the users exist
		if (!usersList) return;

		// Fetch every user repository
		(async () => {
			// Iterate over the usernames
			usersList.map(async (user, index) => {
				// Fetch user apps/repositories
				const res = await fetch(`${serverUrl}/user/apps/getUserApps/`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: new Blob([JSON.stringify({ user })], {
						type: "application/json",
					}),
				})
					.then((res) => res.json())
					.catch((err) => console.log(`Error: `, err));

				// Set user repositories
				if (res) {
					setUserRepositories((prev) => {
						return {
							...prev,
							[user]: res["apps"],
						};
					});
				}
			});
		})();
	}, [usersList]);

	return {
		users: usersList,
		selectedUser,
		setSelectedUser,
		userRepositories,
		updateRepository,
	};
}
