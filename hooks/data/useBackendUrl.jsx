import { useEffect, useState } from "react";

export default function useBackendUrl() {
	const [backendUrl, setBackendUrl] = useState("");

	// Get backend url
	useEffect(() => {
		const servers = CS.get("servers");
		if (servers && servers["devtoolsBackendServer"]) {
			setBackendUrl(servers["devtoolsBackendServer"]);
		}
	}, []);

	return [backendUrl, setBackendUrl];
}
