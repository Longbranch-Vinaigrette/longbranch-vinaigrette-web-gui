import { useEffect, useState } from "react";
import useArbiter from "../../../../hooks/data/useArbiter";

export default function getUserRepositories() {
	const [usersList, usersListId] = useArbiter("/repositories/usersList");
	const [userRepositories, userRepositoriesId] = useArbiter(
		"/repositories/user/getRepositorySettings",
		// Give the first user as a dependency, if not found give undefined
		[(usersList && usersList[0]) || undefined]
	);

	useEffect(() => {
		console.log(`Users list: `, usersList);
	}, [usersList]);

	useEffect(() => {
		console.log(`User repositories: `, userRepositories);
	}, [userRepositories]);

	return <div></div>;
}
