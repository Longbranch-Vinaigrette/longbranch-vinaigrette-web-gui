const routesLocation = "/devtools/routes";

import PythonArbiterRequest from "./PythonArbiterRequest";

export default class PythonArbiter {
	constructor(backendUrl) {
		/**Class for handling /pythonArbitrer route on Devtools Backend Server
		 *
		 */
		this.backendUrl = backendUrl;

		// If there was no backend url given throw a big ass error
		if (!this.backendUrl || this.backendUrl === "") {
			throw new Error(
				`/lib/data/pythonArbitrer -> PythonArbitrer::constructor(): ` +
					`No backend url given`
			);
		}
	}

	/**Handler function for '/pythonArbitrary' route on the backend server
	 *
	 * This function SHOULD be called whenever you try to fetch/post resources on the
	 * backend.
	 *
	 * @param {string} route The route to fetch data to.
	 * @param {Array} dataDependencies The data dependencies array.
	 * @returns {Object} The response object.
	 */
	async dispatch(route, dataDependencies = []) {
		// Python files end with .py, so if it wasn't given, let's add it.
		let newRoute = "";
		if (!route.endsWith(".py")) newRoute = `${route}.py`;

		const request = new PythonArbiterRequest(route, dataDependencies);

		// Send request
		// const response = await this.arbitraryRequest(newRoute);
		const response = await request.sendArbitraryRequest();

		return response;
	}
}
