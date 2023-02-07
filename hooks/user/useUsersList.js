import { useEffect, useState } from "react";

export default function useUsersList() {
	const [usersList, setUsersList] = useState();

	// Fetch the data and set it on the global scope
	useEffect(() => {
		const route = "/user/getLocalUsers/";
		CS.getUnit(route) ?? CS.createAndAppendArbiterUnit(route, route);
		(async () => {
			const unit = CS.getUnit(route);
			const data = await unit.dispatch();
			setUsersList(data["users"]);
		})();
	}, []);

	return [usersList];
}
