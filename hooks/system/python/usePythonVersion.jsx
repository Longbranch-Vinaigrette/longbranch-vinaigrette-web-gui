import { useEffect, useState } from "react";

export default function usePythonVersion() {
	const [pythonVersion, setPythonVersion] = useState("");
	const [backendServer] = useState(
		window.appInfo["servers"]["devtoolsBackendServer"]
	);

	// Update python version
	const updatePythonVersion = async () => {
		const res = await fetch(
			`${backendServer}/system/python/getPythonVersion/`,
			{
				method: "GET",
			}
		)
			.then((res) => {
				return res.json();
			})
			.catch((err) => {
				console.log(`Error: `, err);
			});

		// If data exists, set it
		if (res && !res["debug"]) {
			const pythonVersionArray = res["data"]["version"];
			setPythonVersion(pythonVersionArray.join("."));
		}
	};

	// Update python version on start
	useEffect(() => {
		updatePythonVersion();
	}, []);

	return {
		pythonVersion,
		updatePythonVersion,
	};
}
