import { useEffect, useState } from "react";

export default function Test() {
	const [backendUrl, setBackendUrl] = useState("");

	useEffect(() => {
		// If there's no backend url return
		if (!backendUrl) {
			return;
		}

		(async () => {
		})();
	}, [backendUrl]);

	// Set the backend url
	useEffect(() => {
		if (
			window &&
			window.appInfo &&
			window.appInfo["servers"] &&
			window.appInfo["servers"]["devtoolsBackendServer"]
		) {
			const backendUrl = window.appInfo["servers"]["devtoolsBackendServer"];
			setBackendUrl(backendUrl);
		}
	}, []);

	return <div>Test</div>;
}
