// Scripts
import CollisionHandler from "./utility/CollisionHandler";
import UnitStorage from "./utility/UnitStorage";

// Units
import ArbiterUnit from "./utility/units/derivations/specific/ArbiterUnit";
import Unit from "./utility/units/Unit";

/**Unit storage manager
 *
 * Unit storage manager is in charge of handling collisions, appending units, creating
 * units, removing units, etc.
 */
export default class UnitStorageManager extends UnitStorage {
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
			this.collisionHandler = new CollisionHandler(
				this.units,
				options.collisionOptions
			);
		} else {
			this.collisionHandler = new CollisionHandler(this.units, {
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
				`/lib/data/ComprehensiveStorage/storage/UnitStorageManager.js -> ` +
				`UnitStorageManager::appendUnit(${alias}, unit): ` +
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

	/**Check if there's an arbiter
	 *
	 * Check if there's an arbiter if there's none throw an error.
	 */
	checkArbiter() {
		// If there's no arbiter throw an error
		if (!this.arbiter) {
			const message =
				`/lib/data/ComprehensiveStorage/storage/UnitStorageManager.js -> ` +
				`UnitStorageManager::createAndAppendArbiterUnit(${arbiterRoute}, ${alias}): ` +
				`The UnitStorageManager has no arbiter, therefore you can't add an arbiter unit.`;
			throw new Error(message);
		}
	}

	/**Create and appends an arbiter unit
	 *
	 * If alias is not given, then the key will be the route, which is the recommended behaviour.
	 *
	 * @param {*} arbiterRoute The arbiter route is the backend route where the data will
	 * 		retrieved from.
	 * @param {*} alias The alias(or route) is the key to access the data.
	 */
	createAndAppendArbiterUnit(arbiterRoute, alias = undefined) {
		this.checkArbiter();

		// Get the location of the unit
		// If alias doesn't exist, then the location will be arbiterRoute
		const unitLocation = alias ?? arbiterRoute;
		const canCreateUnit = this.collisionHandler.canCreateUnitAt(unitLocation);

		// If the user can't create the unit, return.
		if (!canCreateUnit) return;

		// Create unit
		const unit = new ArbiterUnit(arbiterRoute, this.arbiter, alias);

		// Append unit
		return this.appendUnit(unitLocation, unit);
	}
}
