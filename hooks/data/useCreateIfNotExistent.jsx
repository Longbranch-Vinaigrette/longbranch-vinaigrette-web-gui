import { useEffect, useState } from "react";

export default function useCreateIfNotExistent(route) {
	const [value, setValue] = useState();

	useEffect(() => {
		(async () => {
			// Check if the unit exists, if it doesn't create it.
			// If the left one is null, it will return the second one
			console.log(`Given route: `, route);
			!CS.getUnit(route) && (await CS.createDynamicUnit(route));

			// Set the unit
			setValue(CS.getUnit(route));
		})();
	}, []);

	return [value, setValue];
}
