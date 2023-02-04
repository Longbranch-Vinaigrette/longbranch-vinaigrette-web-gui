import PythonArbitrer from "../PythonArbitrer";

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
	constructor(
		arbitrerRoute,
		data = undefined,
		alias = undefined,
		backendUrl = undefined
	) {
		// Set backend url
		if (backendUrl === undefined) {
			throw new Error("Backend url can't be undefined.");
		} else {
			this.arbitrer = new PythonArbitrer(backendUrl);
		}

		// The arbitrer is a route to the python file starting from
		// /public/devtools/routes/ROUTE_TO_ARBITRER
		// Note that only the last part SHALL be given through the parameter.
		this.arbitrerRoute = arbitrerRoute;

		// Set alias
		if (alias !== undefined) {
			this.alias = alias;
		} else {
			this.alias = arbitrerRoute;
		}

		// Given data
		// If the data is static it will be received from the get go.
		this.data = data;

		// Set whether the data should be static or not.
		if (data !== undefined) {
			this.static = false;
		} else {
			this.static = true;
		}
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
		this.data = this.arbitrer.dispatch(this.route);
		return this.data;
	}

	// Get and set
	setData(data) {
		this.data = data;
	}

	getData() {
		return this.data;
	}
}
