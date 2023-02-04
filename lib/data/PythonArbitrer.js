const routesLocation = "/devtools/routes";

export default class PythonArbitrer {
	constructor(backendUrl) {
		this.backendUrl = backendUrl;

		// If there was no backend url given throw a big ass error
		if (!this.backendUrl || this.backendUrl === "") {
			throw new Error(
				`/lib/pythonArbitrary::PythonArbitrary::constructor(): ` +
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
		// If the route doesn't start with / then just add it bro.
		let newRoute = "";
		newRoute = route;
		if (!newRoute.startsWith("/")) {
			newRoute = `/${newRoute}`;
		}
		const fullRoute = `${routesLocation}${newRoute}`;

		// Fetch python file
		return await fetch(fullRoute, {
			headers: {
				Accept: "text/plain",
			},
		})
			.then((res) => {
				return res.text();
			})
			.catch((err) => {
				console.log(
					`/lib/pythonArbitrary::PythonArbitrary::getRouteScript(): \n` +
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
			console.log(
				`/lib/pythonArbitrary::PythonArbitrary::arbitraryRequest(): ` +
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
				console.log(
					`/lib/pythonArbitrary::PythonArbitrary::arbitraryRequest(): ` +
						`Request error when sending the script: `,
					err
				);
			});
	}

	async dispatch(route) {
		/**Handler function for '/pythonArbitrary' route on the backend server
		 *
		 * This function SHOULD be called whenever you try to fetch/post resources on the
		 * backend.
		 *
		 */
		return await this.arbitraryRequest(route);
	}
}
