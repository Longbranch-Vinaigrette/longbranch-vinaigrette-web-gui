import { useEffect, useState } from "react";

export default function useCollapseNavbar() {
	const key = "collapseNavbar";
	const [collapseNavbar, setCollapseNavbar] = useState(false);

	useEffect(() => {
		// Get dark theme
		const integer = localStorage.getItem(key);
		const value = integer == "true" ? true : false;
		setCollapseNavbar(value);
	}, []);

	// Update local storage
	useEffect(() => {
		const value = key ? "true" : "false";
		localStorage.setItem(key, value);
	}, [collapseNavbar]);

	return [collapseNavbar, setCollapseNavbar];
}
