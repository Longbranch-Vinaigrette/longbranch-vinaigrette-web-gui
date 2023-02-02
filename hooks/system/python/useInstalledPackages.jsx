import { useEffect, useState } from "react";

export default function useInstalledPackages() {
	const [installedPackages, setInstalledPackages] = useState([]);
	const [backendServer, setBackendServer] = useState("");

	// Update python version
	const updateInstalledPackages = async () => {
		const res = await fetch(
			`${backendServer}/system/python/getInstalledPackages/`,
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
			const installedPackages = res["data"]["packages"];
			setInstalledPackages(installedPackages);
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

		updateInstalledPackages();
	}, [backendServer]);

	return {
		installedPackages,
		updateInstalledPackages,
	};
}
