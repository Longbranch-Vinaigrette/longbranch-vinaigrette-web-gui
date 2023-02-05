/**Find class
 *
 * The purpose of this class is to find nested objects like so:
 * units.MyObject.user.dateInfo.creationDate
 *
 * Another point of this class is to be explicit.
 * 
 * My main use for this class is to find an item and if not found return undefined instead
 * of throwing an error.
 */
class Find {
	/**Constructor for the find class
	 *
	 * @param {object} unitsRef A reference to the units object.
	 */
	constructor(unitsRef) {
		this.units = unitsRef;
	}

	/**Recursively travel through the data and get the last element
	 *
	 * @param {*} data The first data object.
	 * @param {*} nestedIn An array of strings which have every key to access the data.
	 * @returns The lowermost item on the nested array.
	 */
	#getNestedData(data, nestedIn = []) {
		const firstElement = nestedIn.shift();
		return this.#unit(data[firstElement], nestedIn.slice(1));
	}

	/**Find a nested variable on a Unit, if not found returns undefined.
	 *
	 * @param {string} alias Alias(or route) where the unit is located.
	 * @param {Array} nestedIn The nesting level of the item.
	 */
	unit(alias, nestedIn = []) {
		try {
			// Retrieve the data
			return this.#getNestedData(this.units[alias], nestedIn);
		} catch (err) {
			// Data not found.
			const message =
				`/lib/data/ComprehensiveStorage/storage/Find.js -> ` +
				`Find::unit(): ` +
				`Couldn't find element on unit ${alias} at depth ${nestedIn}.`;
			console.warn(message);
			return undefined;
		}
	}
}
