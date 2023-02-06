import { useEffect, useState } from "react";
import useArbiter from "../../../../hooks/data/useArbiter";

const felixRepositoriesRoute = "/repositories/user/getRepositorySettings";
export default function getUserRepositories() {
	const [usersList, setUsersList] = useArbiter("/repositories/usersList");
	const [felixRepositories, setFelixRepositories] = useState();

	useEffect(() => {
		console.log(`Felix repositories: `.felixRepositories);
	}, [felixRepositories]);

	useEffect(() => {
		if (!usersList) return;

		(async () => {
			// Create arbiter unit
			CS.getUnit(felixRepositoriesRoute) ??
				CS.createAndAppendArbiterUnit(
					felixRepositoriesRoute,
					`${felixRepositoriesRoute}:${usersList[0]}`
				);

			// Get data
			await CS.getUnit(felixRepositoriesRoute).updateData([usersList[0]]);
		})();
	}, [usersList]);
	return <div></div>;
}
