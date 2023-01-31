import { useEffect, useState } from "react";

export default function useFancyUserRepositorySettings() {
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState("");
	const [userRepositories, setUserRepositories] = useState({});

	const serverUrl = "http://localhost:37000";
	const selectedUserKeyword = "fancyUserRepositorySettings/selectedUser";

	// Load selected user locally
	useEffect(() => {
		const loadedSelectedUser = localStorage.getItem(selectedUserKeyword);
		const isEmpty = !loadedSelectedUser;

		if (!isEmpty) {
			setSelectedUser(loadedSelectedUser);
		}
	}, []);

	// Save selected user locally
	useEffect(() => {
		localStorage.setItem(selectedUserKeyword, selectedUser);
	}, [selectedUser]);

	// Update a repository
	const updateRepository = (user, repositoryName, data) => {
		// console.log(`User: `, user);
		// console.log(`Repository name: `, repositoryName);
		// console.log(`Updating repository with the values: `, data);
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

	// Get local users
	useEffect(() => {
		(async () => {
			const res = await fetch(`${serverUrl}/user/getLocalUsers/`, {
				method: "GET",
			})
				.then((res) => {
					return res.json();
				})
				.catch((err) => {
					// Remember that netowork errors are usually a cors problem
					console.log("Error: ", err)
				});

			if (res) {
				setUsers(res["users"]);

				// An alias for me to understand
				const isUserEmpty = !selectedUser;
				
				// Only if the user is empty shall we select a user for the user
				if (isUserEmpty) {
					setSelectedUser(res["users"][0]);
				}
			}
		})();
	}, []);

	// After we get the local users, we can retrieve the repositories for each user,
	// the question is how?.
	useEffect(() => {
		// Fetch every user repository
		(async () => {
			// Iterate over the usernames
			users.map(async (user, index) => {
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
	}, [users]);

	return {
		users,
		selectedUser,
		setSelectedUser,
		userRepositories,
		updateRepository,
	};
}
