import Unit from "../Unit";

/**Dynamic unit
 */
export default class DynamicUnit extends Unit {
	constructor(alias, data = undefined) {
		// Set given data
		if (!alias) {
			const msg =
				`/lib/data/units/derivations/DynamicUnit -> DynamicUnit::constructor(): ` +
				`No alias given.`;
			throw new Error(msg);
		}
		this.alias = alias;
		this.data = data;
	}
}
