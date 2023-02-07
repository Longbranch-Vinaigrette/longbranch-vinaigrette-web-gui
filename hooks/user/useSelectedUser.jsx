import { useEffect, useState } from "react";

import useSettingsTable from "../db/useSettingsTable";
const selectedUserKeyword = "fancyUserRepositorySettings/selectedUser";

export default function useSelectedUser() {
	const [selectedUser, setSelectedUser] = useState("");
	const { set: setSetting } = useSettingsTable();

	// Load selected user locally
	useEffect(() => {
		const loadedSelectedUser = localStorage.getItem(selectedUserKeyword);
		const isEmpty = !loadedSelectedUser;

		if (!isEmpty) {
			setSelectedUser(loadedSelectedUser);
		}
	}, []);

	// Detect changes and save
	useEffect(() => {
		// Validate user
		if (!selectedUser) return;
		if (typeof selectedUser === typeof undefined) return;

		// Set data
		localStorage.setItem(selectedUserKeyword, selectedUser);
		// Also set on the database, because nextjs resets the localstorage somehow
		setSetting("selectedUser", selectedUser);
	}, [selectedUser]);

	return [selectedUser, setSelectedUser];
}
