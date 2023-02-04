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
 * the python file
 */
import PythonArbitrer from "./PythonArbitrer";
import Unit from "./units/Unit";

export default class ComprehensiveStorage {
	units = {};

	/**Comprehensive storage class
	 *
	 * This class is intended to automatically handle data fetching, data updates and
	 * cache.
	 *
	 */
	constructor(backendUrl) {
		this.backendUrl = backendUrl;
		// Create the arbitrer
		this.arbitrer = new PythonArbitrer(this.backendUrl);
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

		// Let's update the unit first so then we can return its data.
		await unit.updateRoute();

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
		return this.createUnit(route, (data = undefined), alias);
	}

	async createStaticUnit(route, data, alias = undefined) {
		/**Require static data
		 *
		 * Add a static Unit to store static data.
		 *
		 */
		return this.createUnit(route, data, alias);
	}

	async updateUnit(key) {
		/**Update a unit
		 *
		 * Updates a unit by a given key which is the route or alias used on
		 * instantiation.
		 *
		 */
		return this.units[key].update();
	}

	// Get and set unit data
	set(key, data) {
		/**Set data on a unit
		 *
		 * Sets data on a unit by a given key which is the route or alias used on
		 * instantiation.
		 *
		 */
		return this.units[key].setData(data);
	}

	get(key) {
		/**Retrieve data from a Unit
		 *
		 * Retrieves data from a unit by a given key which is the route or alias used on
		 * instantiation.
		 *
		 */
		return this.units[key].getData();
	}
}
