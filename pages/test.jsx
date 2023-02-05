import { useEffect, useState } from "react";
import useDevtoolsBackendUrl from "../hooks/data/static/useDevtoolsBackendUrl";

import useArbiter from "../hooks/data/useArbiter";

export default function Test() {
	const [backendServer, setBackendServer] = useDevtoolsBackendUrl();
	const [usersList, updateUsersList] = useArbiter(
		"/repositories/usersList"
	);
	const [updated, setUpdated] = useState(false);

	useEffect(() => {
		if (backendServer) console.log(`Backend server url: `, backendServer);
	}, [backendServer]);

	useEffect(() => {
		if (usersList) console.log(`Users list: `, usersList);
	}, [usersList]);

	return <div>Test</div>;
}
