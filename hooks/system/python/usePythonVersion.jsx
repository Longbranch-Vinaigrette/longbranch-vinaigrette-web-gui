import { useEffect, useState } from "react";

export default function usePythonVersion() {
	const [pythonVersion, setPythonVersion] = useState("");
	const [backendServer, setBackendServer] = useState("");

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
		// When the hook is used like this, it's synchronous
		setBackendServer(
			(prev) => window.appInfo["servers"]["devtoolsBackendServer"]
		);

		// Check if the backend server url has been retrieved
		if (!backendServer) return;

		updatePythonVersion();
	}, [backendServer]);

	return {
		pythonVersion,
		updatePythonVersion,
	};
}
