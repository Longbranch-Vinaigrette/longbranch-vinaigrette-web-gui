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
	constructor(arbiter = undefined, allowCollisions = false) {
		// Set the arbiter
		this.arbiter = arbiter;
		// Allow colllisions or not
		this.allowCollisions = allowCollisions;
	}

	/**Set the arbiter
	 * 
	 * @param {any} arbiter
	 */
	set arbiter(arbiter) {
		this.arbiter = arbiter;
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
