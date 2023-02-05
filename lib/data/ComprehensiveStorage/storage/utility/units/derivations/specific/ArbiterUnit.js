import DynamicUnit from "../DynamicUnit";

/**Dynamic unit
 */
export default class ArbiterUnit extends DynamicUnit {
	constructor(arbiterRoute, arbiter, alias = undefined) {
		// Make some checks before anything
		if (!arbiter) {
			const msg =
				`/lib/data/ComprehensiveStorage/storage/utility/units/derivations/specific` +
				`/ArbitrerUnit.js -> ` +
				`ArbiterUnit::constructor(): ` +
				`No arbiter given.`;
			throw new Error(msg);
		}
		if (!arbiterRoute) {
			const msg =
				`/lib/data/ComprehensiveStorage/storage/utility/units/derivations/specific` +
				`/ArbitrerUnit.js -> ` +
				`ArbiterUnit::constructor(): ` +
				`No arbiter route given.`;
			throw new Error(msg);
		}
		this.arbiter = arbiter;

		// Set arbiter route
		this.arbiterRoute = arbiterRoute;

		// Set alias
		alias && (this.alias = alias);
		// If not alias
		alias ?? (this.alias = arbiterRoute);

		// Call the constructor of DynamicUnit
		super(this.alias, undefined);
	}

	async updateData() {
		/**Update route data
		 *
		 */
		this.data = await this.arbiter.dispatch(this.arbiterRoute);
		return this.data;
	}

	/**Get alias.
	 * 
	 * @returns 
	 */
	getAlias() {
		return this.alias;
	}
}
