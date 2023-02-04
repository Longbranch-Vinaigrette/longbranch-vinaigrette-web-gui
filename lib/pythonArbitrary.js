const routesLocation = "/devtools/routes";

export default class PythonArbitray {
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
				return res.body;
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
		console.log(`Route script: \n`, routeScript);

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
			.then((err) => {
				console.log(
					`/lib/pythonArbitrary::PythonArbitrary::getRouteScript(): ` +
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

// export const getRouteScript = async (route) => {
// 	/**Function to retrieve the public route script
// 	 *
// 	 */
// 	// If the route doesn't start with / then just add it bro.
// 	let newRoute = "";
// 	newRoute = route;
// 	if (!newRoute.startsWith("/")) {
// 		newRoute = `/${newRoute}`;
// 	}
// 	const fullRoute = `${routesLocation}${newRoute}`;

// 	// Fetch python file
// 	return await fetch(fullRoute, {
// 		headers: {
// 			Accept: "text/plain",
// 		},
// 	})
// 		.then((res) => {
// 			return res.body;
// 		})
// 		.catch((err) => {
// 			console.log(
// 				`/lib/pythonArbitrary::getRouteScript(): Error when trying to fetch ` +
// 					`data from ${routesLocation}${route}.\nError: `,
// 				err
// 			);
// 			return undefined;
// 		});
// };

// export const arbitraryRequest = async (route) => {
// 	/**Arbitrary request
// 	 *
// 	 * This functions sends a request to the backend with the script at the given
// 	 * route.
// 	 *
// 	 */
// 	const routeScript = await getRouteScript(route);

// 	if (!routeScript) {
// 		console.log(
// 			`/lib/pythonArbitrary::arbitraryRequest(): ` +
// 				`Couldn't fetch the python script at the given route, are you sure the ` +
// 				`route is okay?`
// 		);
// 		return;
// 	}
// 	console.log(`Route script: \n`, routeScript);

// 	return await fetch(`${backendUrl}/pythonArbitrary/`, {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "text/plain",
// 		},
// 		body: new Blob([routeScript], {
// 			type: "text/plain",
// 		}),
// 	})
// 		.then((res) => {
// 			return res.json();
// 		})
// 		.then((err) => {
// 			console.log(
// 				`/lib/pythonArbitrary::getRouteScript(): ` +
// 					`Request error when sending the script: `,
// 				err
// 			);
// 		});
// };

// export default async function pythonArbitrary(route) {
// 	/**Handler function for '/pythonArbitrary' route on the backend server
// 	 *
// 	 */
// 	return await arbitraryRequest(route);
// }
