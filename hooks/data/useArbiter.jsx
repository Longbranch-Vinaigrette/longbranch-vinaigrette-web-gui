import { useEffect, useState } from "react";

/**Use an arbiter unit
 *
 * Creates an arbiter unit at the given route if it doesn't exist.
 * If there's already a unit on the same route or alias,
 * it will return that arbiter unit.
 *
 * @param {string} route The route to fetch the data from(which should be the arbiter code).
 * @param {alias} alias The alias of the data, this is where the unit will be located and
 * 			how the unit is identified
 * @param {Array} dataDependencies An array of data dependencies, when an item changes,
 * 			the data will be updated.
 * @returns {Array} The result and a function to update data.
 */
export default function useArbiter(
	route,
	alias = undefined,
	dataDependencies = []
) {
	const [value, setValue] = useState();

	// Check if it's an array
	if (!(typeof dataDependencies === typeof []))
		throw new Error("Error: Data dependencies must be an array");

	// Create unit
	useEffect(() => {
		// Check if the unit exists, if it doesn't create it.
		// If the left one is null, it will return the second one
		CS.getUnit(route) ?? CS.createAndAppendArbiterUnit(route, alias);
	}, []);

	// Update the data
	useEffect(() => {
		(async () => {
			// Update data
			await CS.getUnit(route).updateData(dataDependencies);

			// Set the unit
			setValue((prev) => CS.getUnit(route).data);
		})();
	}, dataDependencies);

	/**Update unit data
	 *
	 */
	const updateData = async () => {
		await CS.getUnit(route).updateData(dataDependencies);
	};

	return [value, updateData];
}
