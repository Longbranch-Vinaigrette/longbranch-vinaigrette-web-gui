// Scripts
import CollisionHandler from "../CollisionHandler";
import UnitStorage from "../UnitStorage";

// Units
import ArbiterUnit from "../../units/derivations/specific/ArbiterUnit";
import Unit from "../../units/Unit";

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
export default class ComprehensiveStorage extends UnitStorage {
	/**Comprehensive storage class
	 *
	 * This class is intended to automatically handle data fetching, data updates and
	 * cache.
	 *
	 * @param {class} arbiter The arbiter is an instance of an object that receives routes
	 * 		and updates data accordingly, to receive updates and stuff add a function to the
	 * 		class/object called 'dispatch'.
	 * @param {object} options Additional options to specify the behaviour of
	 * 		ComprehensiveStorage.
	 * 		@param {boolean} allowCollisions This flag is used to allow collisions or not, a
	 * 				collision is when you try to create a new route/alias on an already existing
	 * 				route/alias, if false, a collision will throw an error.
	 * 		@param {boolean} dontCreateUnitOnCollision This flag is used when adding a Unit or
	 * 				creating one, if enabled overrides the behaviour of 'allowCollisions' and instead
	 * 				of throws an error on collision, it will not do anything on collision.
	 */
	constructor(
		arbiter = undefined,
		options = {
			collisionOptions: {
				allowCollisions: false,
				dontCreateUnitOnCollision: false,
			},
		}
	) {
		super();

		// Set the arbiter
		this.arbiter = arbiter;

		// Create a collision handler
		if (options && options.collisionOptions) {
			this.collisionHandler = new CollisionHandler(options.collisionOptions);
		} else {
			this.collisionHandler = new CollisionHandler({
				allowCollisions: false,
				dontCreateUnitOnCollision: false,
			});
		}
	}

	/**Append a given unit to the units object
	 *
	 * It first checks if there are collisions and if collisions are enabled or not.
	 *
	 * @param {string} alias Alias(or route) of the unit.
	 * @param {Unit} unit Unit to be appended.
	 * @returns
	 */
	appendUnit(alias, unit) {
		// Check if the user can create a unit
		// It may throw an error
		const canAppendUnit = this.collisionHandler.canCreateUnitAt(alias);

		// Check if it can append a unit and do it if possible.
		if (canAppendUnit) {
			return this.setUnit(alias, unit);
		} else {
			const message =
				`/lib/data/storage/comprehensiveStorage -> ` +
				`ComprehensiveStorage::appendUnit(${alias}, unit): ` +
				`The unit can't be can't be created because it collides with another unit.`;
			console.warn(message);
		}

		return this.getUnit(alias);
	}

	/**Create and append unit
	 *
	 * @param {string} alias The alias(or route) of the unit.
	 * @param {any} data The data of the unit.
	 */
	createAndAppendUnit(alias, data) {
		// Create unit
		const unit = new Unit(alias, data);

		// Append unit
		return this.appendUnit(alias, unit);
	}

	/**Create and appends an arbiter unit
	 *
	 * @param {*} arbiterRoute
	 * @param {*} arbiter
	 * @param {*} alias
	 */
	createAndAppendArbiterUnit(arbiterRoute, arbiter, alias = undefined) {}
}
