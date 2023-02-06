import { useEffect } from "react";
import useArbiter from "../../../../hooks/data/useArbiter";

export default function getUserRepositories() {
	const { data: usersList } = useArbiter("/repositories/usersList");
	const { data: userRepositories } = useArbiter(
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
