import Unit from "../Unit";

/**Static unit
 */
export default class StaticUnit extends Unit {
	constructor(alias, data = undefined) {
		super(alias, data);
		
		// Set given data
		if (!alias) {
			const msg =
				`/lib/data/units/derivations/StaticUnit -> StaticUnit::constructor(): ` +
				`No alias given.`;
			throw new Error(msg);
		}
		this.alias = alias;
		this.data = data;
	}
	
	/**
	 * @param {any} data
	 */
	set data(data) {
		throw new Error("The unit is a static unit, it cannot change.")
	}
}
