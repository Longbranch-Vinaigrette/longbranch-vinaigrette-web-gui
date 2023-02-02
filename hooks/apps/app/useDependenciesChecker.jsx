// Hooks
import useInstalledPackages from "../../system/python/useInstalledPackages";
import usePythonVersion from "../../system/python/usePythonVersion";

export default function useDependenciesChecker({ appSettings, ...args }) {
	// Check if dependencies are satisfied
	const [dependenciesSatisfied, setDependenciesSatisfied] = useState(true);
	const [appDependencies, setAppDependencies] = useState([]);

	// Retrieve information about the programming language name, version and installed
	// packages.
	const updateDependenciesSatisfied = () => {
		// Get information
		if (appSettings["information"] && appSettings["information"]["language"]) {
			// App language
			const appLanguage = appSettings["information"]["language"];

			if (appLanguage == "python") {
				// Get python version and installed packages
				const { pythonVersion } = usePythonVersion();
				const { installedPackages } = useInstalledPackages();

				// Update values
				setLanguageVersion(pythonVersion);
				setPackages(installedPackages);

				if (appSettings["dependencies"]) {
					// Check if the dependencies are satisfied
					for (const dependency of appSettings["dependencies"]) {
						let isOk = false;
						// Map installed packages
						installedPackages.map((item, index) => {
							// Check if the names match
							if (dependency["name"] == item["name"]) {
								// Ok
								isOk = true;
							}
						});

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
							setDependenciesSatisfied(false);
						}
					}
				}
			}
		}
	};

	// Update dependencies when app settings change
	useEffect(() => {
		updateDependenciesSatisfied();
	}, [appSettings]);

	return {
		dependenciesSatisfied,
		updateDependenciesSatisfied,
	};
}
