import Unit from "../Unit";

/**Dynamic unit
 */
export default class DynamicUnit extends Unit {
	constructor(arbitrerRoute, alias = undefined, arbitrer = undefined) {
		// Set arbitrer(to update data)
		this.arbitrer = arbitrer;

		// Set arbitrer route
		this.arbitrerRoute = arbitrerRoute;

		// Set alias
		this.alias = alias;
	}

	async updateData() {
		/**Update route data
		 *
		 */
		this.data = await this.arbitrer.dispatch(this.arbitrerRoute);
		return this.data;
	}
}
