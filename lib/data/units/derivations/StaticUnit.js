import Unit from "../Unit";

/**Static unit
 */
export default class StaticUnit extends Unit {
	constructor(alias, data = undefined) {
		// Set given data
		if (!this.alias) {
			const msg =
				`/lib/data/units/derivations/StaticUnit -> StaticUnit::constructor(): ` +
				`No alias given.`;
			throw new Error(msg);
		}
		this.alias = alias;
		this.data = data;
	}
}
