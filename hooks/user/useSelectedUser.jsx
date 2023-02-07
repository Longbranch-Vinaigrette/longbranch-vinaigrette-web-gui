import { useEffect, useState } from "react";

import useSettingsTable from "../db/useSettingsTable";
const selectedUserKeyword = "selectedUser";

export default function useSelectedUser() {
	const [selectedUser, setSelectedUser] = useState("");
	const { set: setSetting, get: getSetting } = useSettingsTable();

	// Load selected user locally
	useEffect(() => {
		(async () => {
			// Prefer the database over local storage, because nextjs resets local storage
			// every time.
			const actualSelectedUser = await getSetting(selectedUserKeyword);
			console.log(`Got selected user: `, actualSelectedUser);
			if (actualSelectedUser) {
				// Set its value
				setSelectedUser(actualSelectedUser["value"]);
			} else {
				const loadedSelectedUser = localStorage.getItem(selectedUserKeyword);
				const isEmpty = !loadedSelectedUser;

				if (!isEmpty) {
					setSelectedUser(loadedSelectedUser);
				}
			}
		})();
	}, []);

	// Detect changes and save
	useEffect(() => {
		// Validate user
		if (!selectedUser) return;
		if (typeof selectedUser === typeof undefined) return;

		// Set data
		localStorage.setItem(selectedUserKeyword, selectedUser);
		// Also set on the database, because nextjs resets the localstorage somehow
		setSetting(selectedUserKeyword, selectedUser);
	}, [selectedUser]);

	return [selectedUser, setSelectedUser];
}
