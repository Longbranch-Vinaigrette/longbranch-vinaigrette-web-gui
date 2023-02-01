import { useEffect, useState } from "react";

export default function useAppStatus({ path, ...props }) {
	const [appStatus, setAppStatus] = useState(false);
	const [servers] = useState(window.appInfo["servers"]);

	// Check whether the app is running or not
	const updateAppStatus = () => {};

	useEffect(() => {
		// Get the backend server
		const backendServer = servers["devtoolsBackendServer"];
		if (backendServer) {
			// Fetch data
			(async () => {
				const res = await fetch(`${backendServer}/app/status/isAppRunning/`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: new Blob([JSON.stringify({ path })], {
						type: "application/json",
					}),
				})
					.then((res) => {
						return res.json();
					})
					.catch((err) => {
						console.log(err);
					});

				// If there is an actual response
				if (res && !res["debug"]) {
					const status = res["data"]["isAppRunning"];
					setAppStatus(status);
				}
			})();
		}
	}, [servers]);

	return {
		appStatus,
		updateAppStatus,
	};
}
