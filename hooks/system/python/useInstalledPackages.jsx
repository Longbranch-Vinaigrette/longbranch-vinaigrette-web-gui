import { useEffect, useState } from "react";
import useDevtoolsBackendUrl from "../../data/static/useDevtoolsBackendUrl";

export default function useInstalledPythonPackages() {
	const [installedPythonPackages, setInstalledPythonPackages] = useState([]);
	const [serverUrl] = useDevtoolsBackendUrl();

	// Update python version
	const updateInstalledPackages = async () => {
		const res = await fetch(
			`${serverUrl}/system/python/getInstalledPackages/`,
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
			setInstalledPythonPackages((prev) => installedPackages);
		}
	};

	// Update python version on start
	useEffect(() => {
		// Check if the backend server url has been retrieved
		if (!serverUrl) return;

		updateInstalledPackages();
	}, [serverUrl]);

	return {
		installedPythonPackages,
		updateInstalledPackages,
	};
}
