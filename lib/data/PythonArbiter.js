const routesLocation = "/devtools/routes";

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

	async getRouteScript(route) {
		/**Function to retrieve the public script on a given route
		 *
		 * This function is just used to retrieve the script on a given route, which SHOULD be
		 * a plain text python file.
		 *
		 */
		// Fetch python file
		const fullRoute = `${routesLocation}${route}`;
		const arbitrerRef = this;
		return await fetch(fullRoute, {
			headers: {
				Accept: "text/plain",
			},
		})
			.then(async (res) => {
				const text = await res.text();

				// Wrong route given
				if (typeof text === "string" && text.startsWith("<!DOCTYPE")) {
					const msg =
						`/lib/data/PythonArbitrer -> PythonArbitrer::getRouteScript(): ` +
						`The route ${fullRoute} couldn't be found, or there was an ` +
						`unkown error. Error set to PythonArbitrer.lastError`;
					arbitrerRef.lastError = msg;
					console.warn(msg);
					return undefined;
				}

				// Return normal text
				return text;
			})
			.catch((err) => {
				console.log(
					`/lib/data/pythonArbitrer -> PythonArbitrer::getRouteScript(): ` +
						`Error when trying to fetch data from ${routesLocation}${route}.\n` +
						`Error: `,
					err
				);
				return undefined;
			});
	}

	async arbitraryRequest(route) {
		/**Arbitrary request
		 *
		 * This functions sends a request to the backend with the script at the given
		 * route.
		 *
		 * This function SHOULD NOT be called when trying to make requests to the backend,
		 * use dispatch() instead.
		 *
		 */
		const routeScript = await this.getRouteScript(route);

		if (!routeScript) {
			console.warn(
				`/lib/data/pythonArbitrer -> PythonArbitrer::arbitraryRequest(): ` +
					`Couldn't fetch the python script at the given route, are you sure the ` +
					`route is okay?`
			);
			return;
		}

		// Send the actual request
		return await fetch(`${this.backendUrl}/pythonArbitrary/`, {
			method: "POST",
			headers: {
				"Content-Type": "text/plain",
			},
			body: new Blob([routeScript], {
				type: "text/plain",
			}),
		})
			.then((res) => {
				return res.json();
			})
			.catch((err) => {
				console.warn(
					`/lib/pythonArbitrary::PythonArbitrer::arbitraryRequest(): ` +
						`Request error when sending the script: `,
					err
				);
				return undefined;
			});
	}

	async dispatch(route) {
		/**Handler function for '/pythonArbitrary' route on the backend server
		 *
		 * This function SHOULD be called whenever you try to fetch/post resources on the
		 * backend.
		 */

		// Python files end with .py, so if it wasn't given, let's add it.
		let newRoute = "";
		if (!route.endsWith(".py")) newRoute = `${route}.py`;
		
		return await this.arbitraryRequest(newRoute);
	}
}
