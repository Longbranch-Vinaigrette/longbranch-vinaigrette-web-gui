import CollisionHandler from "../CollisionHandler";
import UnitStorage from "../UnitStorage";

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
			allowCollisions: false,
			dontCreateUnitOnCollision: false,
		}
	) {
		// Set the arbiter
		this.arbiter = arbiter;

		// Create a collision handler
		this.collisionHandler = new CollisionHandler(options);
	}
	
	/**Append a given unit to the units object
	 * 
	 * It first checks if there are collisions and if collisions are enabled or not.
	 * 
	 * @param {*} alias 
	 * @param {*} unit 
	 * @returns 
	 */
	appendUnit(alias, unit) {
		// Check if the user can create a unit
		// It may throw an error
		this.collisionHandler.canCreateUnitAt(alias);
		return this.getUnit(alias);
	}
}
