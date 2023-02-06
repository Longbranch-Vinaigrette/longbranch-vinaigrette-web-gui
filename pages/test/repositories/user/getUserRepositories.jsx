import { useEffect } from "react";
import useArbiter from "../../../../hooks/data/useArbiter";

export default function getUserRepositories() {
	const [usersList, setUsersList] = useArbiter("/repositories/getUsersList");
	const [userRepositories] = useArbiter(
		"/repositories/user/getRepositorySettings",
		// Alias
		`/repositories/user/getRepositorySettings:${usersList[0]}`,
		// Data dependencies
		usersList
	);

	useEffect(() => {
		console.log(`User repositories: `, userRepositories);
	}, [userRepositories]);
	return <div></div>;
}
