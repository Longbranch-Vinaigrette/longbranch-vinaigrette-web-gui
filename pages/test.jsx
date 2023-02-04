import { useEffect, useState } from "react";

import useUsersList from "../hooks/data/repositories/useUsersList";
import useBackendUrl from "../hooks/data/useBackendUrl";

export default function Test() {
	const [backendUrl] = useBackendUrl();
	const { usersList, setUsersList } = useUsersList();

	useEffect(() => {
		if (backendUrl) {
			console.log(`Backend url: ${backendUrl}`);
		}
	}, [backendUrl]);

	// Users list
	useEffect(() => {
		if (usersList) {
			console.log(`Users list: `, usersList);
		}
	}, [usersList]);

	return <div>Test</div>;
}
