import { useState, useEffect } from "react";

// Hooks
import useInstalledPackages from "../../system/python/useInstalledPackages";
import usePythonVersion from "../../system/python/usePythonVersion";

export default function useDependenciesChecker({ appSettings, ...props }) {
	// Check if dependencies are satisfied
	const [dependenciesSatisfied, setDependenciesSatisfied] = useState(true);
	const [appDependencies, setAppDependencies] = useState([]);

	// Get python version and installed packages
	const { pythonVersion } = usePythonVersion();
	const { installedPackages } = useInstalledPackages();

	// Retrieve information about the programming language name, version and installed
	// packages.
	const updateDependenciesSatisfied = () => {
		// Get information
		if (appSettings["information"] && appSettings["information"]["language"]) {
			// App language
			const appLanguage = appSettings["information"]["language"];

			if (appLanguage == "python") {
				// Update values
				if (appSettings["dependencies"]) {
					let allDependenciesSatisfied = true;

					// Check if the dependencies are satisfied
					for (const dependency of appSettings["dependencies"]) {
						let isOk = false;

						innerLoop: for (const item of installedPackages) {
							// Check if the names match
							if (dependency["name"] == item["name"]) {
								// Ok
								isOk = true;

								// Now we can go back
								break innerLoop;
							}
						}

						// Add to a list
						setAppDependencies((prev) => {
							return [
								...prev,
								{
									name: dependency["name"],
									satisfied: isOk,
								},
							];
						});

						// Dependency is not satisfied
						if (!isOk) {
							allDependenciesSatisfied = false;
							// Don't break here, because we also want to fill 'appDependencies' state.
							// break;
						}
					}

					// Set dependencies satisfied when all dependencies are
					setDependenciesSatisfied(allDependenciesSatisfied);
				}
			}
		}
	};

	// Update dependencies when app settings change
	useEffect(() => {
		updateDependenciesSatisfied();
	}, [appSettings, installedPackages]);

	return {
		dependenciesSatisfied,
		updateDependenciesSatisfied,
	};
}
