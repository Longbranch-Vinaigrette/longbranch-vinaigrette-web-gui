import { useEffect, useState } from "react";

export default function Test() {
	const [backendServer, setBackendServer] = useState();

	useEffect(() => {
		setBackendServer((prev) =>
			CS.find.unit("servers", ["devtoolsBackendServer"])
		);
	}, []);

	return <div>Test</div>;
}
