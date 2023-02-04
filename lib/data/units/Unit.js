/**Unit class for storing a unit of data
 *
 * This unit is intended to be used internally by ComprehensiveStorage.
 *
 * Name thunk process:
 * Cool names for this subclass that stores items:
 * Container, Unit, Entity, Fragment, Flake(I still haven't decided).
 * I think Unit is the more appropriate name.
 */
export default class Unit {
	constructor(alias, data = undefined) {
		this.data = data;

		// Set alias
		if (alias !== undefined) {
			this.alias = alias;
		} else {
			throw new Error(
				`/lib/data/units/Unit -> Unit::constructor(): ` + `No alias given.`
			);
		}
	}

	setGetThunk(getThunk) {
		/**Set a thunk for getData function
		 *
		 * A getThunk is ran before the data is retrieved.
		 */
		this.getThunk = getThunk;
	}

	// Get and set
	setData(data) {
		this.data = data;
	}

	getData() {
		/**Retrieve data
		 *
		 * If there's a getThunk it will be ran before retrieving data.
		 */
		if (this.getThunk) {
			this.getThunk();
		}
		return this.data;
	}
}
