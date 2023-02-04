// Libraries
import { useEffect, useState } from "react";

// Made by me
import useCreateIfNotExistent from "../useCreateIfNotExistent";
const route = "/repositories/usersList";

export default function useUsersList() {
	const [value, setValue] = useCreateIfNotExistent(route);
	return {
		usersList: value,
		setUsersList: setValue,
	};
}
