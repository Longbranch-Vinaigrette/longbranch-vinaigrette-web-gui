import { useEffect, useState } from "react";

export default function useDarkTheme() {
	const key = "darkTheme";
	const [darkTheme, setDarkTheme] = useState(false);

	useEffect(() => {
		// Get dark theme
		const integer = localStorage.getItem(key);
		const value = integer == "1" ? true : false;
		setDarkTheme(value);
	}, []);

	// Update local storage
	useEffect(() => {
		const value = darkTheme ? "1" : "0";
		localStorage.setItem(key, value);
	}, [darkTheme]);
	
	return [darkTheme, setDarkTheme]
}
