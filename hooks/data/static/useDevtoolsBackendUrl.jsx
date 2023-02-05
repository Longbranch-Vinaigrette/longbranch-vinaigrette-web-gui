import { useEffect, useState } from "react";

export default function useDevtoolsBackendUrl() {
	const [url, setUrl] = useState("");

	// Get backend url
	useEffect(() => {
		// By doing it like this, we make it synchronous
		setUrl((prev) => {
			return CS.find.unit("servers", ["devtoolsBackendServer"]);
		});
	}, []);

	return [url, setUrl];
}
