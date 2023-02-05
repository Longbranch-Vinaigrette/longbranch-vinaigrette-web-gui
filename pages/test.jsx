import { useEffect, useState } from "react";

export default function Test() {
	const [backendServer, setBackendServer] = useState();

	useEffect(() => {
		const data = CS.find.unit("servers", ["devtoolsBackendServer"]);
		console.log(`Data: `, data);
		setBackendServer((prev) => data);
	}, []);

	return <div>Test</div>;
}
