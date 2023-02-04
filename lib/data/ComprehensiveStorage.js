import PythonArbitrer from "./PythonArbitrer";
import Unit from "./units/Unit";

/**
 * This is hard to think.
 *
 * This class is my implementation of a simple storage that is also reliant on frequent
 * updates to the backend, it uses the PythonArbitrer to perform requests and get
 * responses.
 *
 * The main point of this storage is as the name says to be Comprehensive and simple
 * to use.
 *
 * This class should be able to contain multiple units, but not contain em' all from
 * the start, it should contain them as long as the user needs them.
 *
 * The Units should be linked to a python script that is send to the backend through
 * the /arbitraryPython/ route, and which is updated whenever needed to do so.
 *
 * The units can be added through the require function, in which you insert the route to
 * the python file.
 *
 * I believe on programming explicitism.
 */
export default class ComprehensiveStorage {
	units = {};

	/**Comprehensive storage class
	 *
	 * This class is intended to automatically handle data fetching, data updates and
	 * cache.
	 *
	 */
	constructor(backendUrl, allowCollisions = false) {
		this.backendUrl = backendUrl;
		// Create the arbitrer
		this.arbitrer = new PythonArbitrer(this.backendUrl);
		// Allow colllisions or not
		this.allowCollisions = allowCollisions;
	}

	/**Check if a route collides or not
	 *
	 * Returns true if it collides
	 */
	doesCollide(route) {
		if (this.units[route]) {
			return true;
		}
		return false;
	}

	/**Check collisions
	 *
	 * Checks collisions, if there's a collision throws an error.
	 *
	 * @param {string} route
	 * @returns
	 */
	checkCollisions(route) {
		// Check if collisions are allowed or not
		if (!this.allowCollisions) {
			// Check if it collides
			const doesCollide = this.doesCollide(route);
			if (doesCollide) {
				const message =
					`/lib/data/ComprehensiveStorage -> ComprehensiveStorage::createUnit(): ` +
					`The route ${route} collides with a unit that already exists(the unit also ` +
					`uses the same route).`;
				throw new Error(message);
			}
		}
	}

	async createUnit(route, data = undefined, alias = undefined) {
		/**Create unit
		 *
		 * This function is not recommended for use, you should use one of the following:
		 * - createDynamicUnit: For dynamic data.
		 * - createStaticUnit: For static data.
		 *
		 * Seeing the fact that I'm repeating code, I decided to make this function.
		 *
		 * Note that the undefined state of data and alias is used to determine their
		 * behaviour, with this I mean the following:
		 * - If data is given the Unit will be static otherwise it will be dynamic.
		 * - If alias is given, the Unit key access will be the alias if it's undefined
		 * the key will then be the route.
		 *
		 */

		// Create unit
		const unit = new Unit(route, data, alias, this.arbitrer);

		// Store unit on the units object
		if (alias === undefined) {
			// Use the route as the unit key.
			this.units[route] = unit;
		} else {
			// Use the given alias as the unit key.
			this.units[alias] = unit;
		}

		// If the unit is static we can't update it.
		if (!unit.static) {
			// Let's update the unit first so then we can return its data.
			await unit.updateRoute();
		}

		// Return the very unit data
		return unit.getData();
	}

	async createDynamicUnit(route, alias = undefined) {
		/**Require dynamic data
		 *
		 * Add a dynamic Unit that fetches data whenever necessary.
		 *
		 * Note that if it's done like this, data can't be repeated.
		 * For this we will introduce alias, which will be the one called to fetch the data.
		 *
		 */
		const data = undefined;
		return this.createUnit(route, data, alias);
	}

	async createStaticUnit(route, data, alias = undefined) {
		/**Require static data
		 *
		 * Add a static Unit to store static data.
		 *
		 */
		return this.createUnit(route, data, alias);
	}

	getUnit(key) {
		/**Get a unit by key
		 *
		 * This is the same as doing ComprehensiveStorage.units[key], it's here just for
		 * convenience and explicitism.
		 */
		return this.units[key];
	}
}
