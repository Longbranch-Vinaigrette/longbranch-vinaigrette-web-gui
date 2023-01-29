import { useEffect, useState } from "react";

export default function useFancyUserRepositorySettings() {
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState("");
	const [userRepositories, setUserRepositories] = useState({});

	const serverUrl = "http://localhost:37000";

	// Update a repository
	const updateRepository = (user, repositoryName, data) => {
		setUserRepositories((prev) => {
			return {
				// Insert previous data of other users
				...prev,
				
				// ON the user
				[user]: {
					// Insert previous data of the user
					...prev[user],
					
					// Update the repository
					[repositoryName]: {
						// Insert previous data of the repository
						...prev[user][repositoryName],
						
						// Insert the new data
						...data,
					},
				},
			};
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
				.catch((err) => console.log("Error: ", err));

			if (res) {
				console.log(`Users: `, res["users"]);
				setUsers(res["users"]);
				setSelectedUser(res["users"][0]);
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
						console.log(`Response: `, res);
						return {
							...prev,
							[user]: res["apps"],
						};
					});
				} else {
					console.log("Response is empty, response: ", res);
				}
			});
		})();
	}, [users]);

	return { users, selectedUser, setSelectedUser, userRepositories, updateRepository };
}
