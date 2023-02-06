import { useEffect, useState } from "react";
import useArbiter from "../../../../hooks/data/useArbiter";

const felixRepositoriesRoute = "/repositories/user/getRepositorySettings";
export default function getUserRepositories() {
	const [usersList, setUsersList] = useArbiter("/repositories/usersList");
	const [felixUnit, setFelixUnit] = useState();

	useEffect(() => {
		if (!usersList) return;

		// if (!CS.getUnit(felixRepositoriesRoute)) return;
		const unit = CS.getUnit(felixRepositoriesRoute);

		// Create arbiter unit
		unit ??
			CS.createAndAppendArbiterUnit(
				felixRepositoriesRoute,
				`${felixRepositoriesRoute}:${usersList[0]}`
			);

		// Set unit
		CS.getUnit(`${felixRepositoriesRoute}:${usersList[0]}`) &&
			setFelixUnit((prev) =>
				CS.getUnit(`${felixRepositoriesRoute}:${usersList[0]}`)
			);
	}, [usersList]);

	useEffect(() => {
		console.log(`Felix unit: `, felixUnit);
		if (!felixUnit) return;

		(async () => {
			// Get data
			console.log(`Fetching repositories...`);

			await felixUnit.updateData([usersList[0]]);
			console.log(
				`Repositories: `,
				CS.getUnit(`${felixRepositoriesRoute}:${usersList[0]}`).data
			);
		})();
	}, [felixUnit]);
	return <div></div>;
}
