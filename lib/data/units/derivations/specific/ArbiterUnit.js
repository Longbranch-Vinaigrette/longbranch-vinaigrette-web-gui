import DynamicUnit from "../DynamicUnit";

/**Dynamic unit
 */
export default class ArbiterUnit extends DynamicUnit {
	constructor(arbiterRoute, arbiter, alias = undefined) {
		if (!arbiter) {
			const msg =
				`/lib/data/units/derivations/DynamicUnit -> DynamicUnit::constructor(): ` +
				`No arbiter given.`;
			throw new Error(msg);
		}
		if (!arbiterRoute) {
			const msg =
				`/lib/data/units/derivations/DynamicUnit -> DynamicUnit::constructor(): ` +
				`No arbiter route given.`;
			throw new Error(msg);
		}
		this.arbiter = arbiter;

		// Set arbiter route
		this.arbiterRoute = arbiterRoute;

		// Set alias
		this.alias = alias;
	}

	async updateData() {
		/**Update route data
		 *
		 */
		this.data = await this.arbiter.dispatch(this.arbiterRoute);
		return this.data;
	}
}
