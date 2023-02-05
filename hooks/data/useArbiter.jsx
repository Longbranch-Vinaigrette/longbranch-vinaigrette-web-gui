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
export default function useArbiter(route, alias = undefined) {
	const [value, setValue] = useState();

	useEffect(() => {
		(async () => {
			// Check if the unit exists, if it doesn't create it.
			// If the left one is null, it will return the second one
			CS.getUnit(route) ?? (await CS.createAndAppendArbiterUnit(route, alias));

			// Update data
			await CS.getUnit(route).updateData();

			// Set the unit
			setValue((prev) => CS.getUnit(route).data);
		})();
	}, []);

	/**Update unit data
	 *
	 */
	const updateData = async () => {
		await CS.getUnit(route).updateData();
	};

	return [value, updateData];
}
