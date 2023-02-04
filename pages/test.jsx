import { useEffect, useState } from "react";

export default function Test() {
	const [backendUrl, setBackendUrl] = useState("");

	useEffect(() => {
		// If there's no backend url return
		if (!backendUrl) {
			return;
		}

		console.log(`Backend url: `, backendUrl);
	}, [backendUrl]);

	useEffect(() => {
		console.log(`Unit: `, comprehensiveStorage.getUnit("servers"));
		const servers = comprehensiveStorage.get("servers");
		if (servers && servers["devtoolsBackendServer"]) {
			setBackendUrl(servers["devtoolsBackendServer"]);
		}
	}, []);

	return <div>Test</div>;
}
