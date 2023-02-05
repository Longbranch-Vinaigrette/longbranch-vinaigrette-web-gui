import { useEffect, useState } from "react";

/**Use an arbiter unit
 *
 * Creates an arbiter unit at the given route if it doesn't exist.
 * If there's already a unit on the same route or alias,
 * it will return that arbiter unit.
 *
 * @param {*} route
 * @returns
 */
export default function useArbiter(route) {
	const [value, setValue] = useState();

	useEffect(() => {
		(async () => {
			// Check if the unit exists, if it doesn't create it.
			// If the left one is null, it will return the second one
			console.log(`Given route: `, route);
			CS.getUnit(route) ?? (await CS.createAndAppendArbiterUnit(route));

			// Update data
			await CS.getUnit(route).updateData();
			console.log(`Updated ${route} data.`);

			// Set the unit
			setValue((prev) => CS.getUnit(route));
		})();
	}, []);

	return [value, setValue];
}
