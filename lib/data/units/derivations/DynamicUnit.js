import Unit from "../Unit";

/**Dynamic unit
 */
export default class DynamicUnit extends Unit {
	constructor(
		arbitrerRoute,
		data = undefined,
		alias = undefined,
		arbitrer = undefined
	) {
		// Given data
		// If the data is static it will be received from the get go.
		this.data = data;

		// Set whether the data should be static or not.
		if (data !== undefined) {
			this.static = true;
		} else {
			this.static = false;
		}

		// If the data is static there's no need for an arbitrer
		if (!this.isStatic()) {
			// Set arbitrer
			if (arbitrer === undefined) {
				throw new Error(
					`/lib/data/units/Unit -> Unit::constructor(): ` + `No arbitrer given.`
				);
			} else {
				this.arbitrer = arbitrer;
			}
		}

		console.log(
			`Is the given route ${arbitrerRoute} static?: `,
			this.isStatic()
		);
		if (arbitrerRoute && !this.isStatic()) {
			// The arbitrer is a route to the python file starting from
			// /public/devtools/routes/ROUTE_TO_ARBITRER
			// Note that only the last part SHALL be given through the parameter.
			// If the data is static, this will just be used as a keyword to access the data.
			this.arbitrerRoute = arbitrerRoute;
		} else {
			// Throw a big ass error
			const msg =
				`/lib/data/units/Unit -> Unit::constructor(): ` +
				`No arbitrer route given for a dynamic route.`;
			throw new Error(msg);
		}

		// Set alias
		if (alias !== undefined) {
			this.alias = alias;
		} else {
			this.alias = arbitrerRoute;
		}
	}

	isStatic() {
		/**Check if the unit is static or not
		 *
		 * Just to make it explicit.
		 */
		return this.static;
	}

	async updateRoute() {
		/**Update route data
		 *
		 */
		// Check if it's static or not
		if (this.static) {
			throw new Error(`The route/aliased key ${this.alias} is static.`);
		}

		// Update unit data
		this.data = await this.arbitrer.dispatch(this.route);
		return this.data;
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
