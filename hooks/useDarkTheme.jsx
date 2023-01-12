import { useEffect, useState } from "react";

export default function useDarkTheme() {
	const key = "darkTheme";
	const [darkTheme, setDarkTheme] = useState(false);

	useEffect(() => {
		// Get dark theme
		const integer = localStorage.getItem(key);
		const value = integer == "true" ? true : false;
		setDarkTheme(value);
		// console.log(`Loaded value and set variable to: `, value);
	}, []);

	// Update local storage
	useEffect(() => {
		const value = darkTheme ? "true" : "false";
		localStorage.setItem(key, value);
		// console.log(`Value changed, local storage set to: `, value);
	}, [darkTheme]);

	return [darkTheme, setDarkTheme];
}
