import { useEffect, useState } from "react";
import PythonArbitrary from "../lib/PythonArbitrary";

export default function Test() {
	const [backendUrl, setBackendUrl] = useState("");

	useEffect(() => {
		// If there's no backend url return
		if (!backendUrl) {
			return;
		}

		(async () => {
			const arbitrary = new PythonArbitrary(backendUrl);
			const res = await arbitrary.dispatch("/repositories/usersList.py");
			console.log(`Response: `, res);
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
