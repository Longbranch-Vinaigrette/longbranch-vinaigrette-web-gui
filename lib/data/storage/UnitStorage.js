/**Unit storage
 *
 */
export default class UnitStorage {
	units = {};

	/**Unit storage class
	 *
	 * This class is intended to store data, note that its behaviour is more like an abstract
	 * class, so it shouldn't be used anywhere.
	 *
	 * Also it doesn't check for collisions, so if there's a set on the same route, it
	 * will take effect.
	 *
	 */
	constructor() {}

	getUnit(key) {
		/**Get a unit by key
		 *
		 * This is the same as doing ComprehensiveStorage.units[key], it's here just for
		 * convenience and explicitism.
		 */
		return this.units[key];
	}

	/**Append a unit
	 *
	 * Appends a unit to the units object.
	 *
	 * @param {string} alias
	 * @param {*} unit
	 * @returns
	 */
	appendUnit(alias, unit) {
		return (this.units[alias] = unit);
	}
}
