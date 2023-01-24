import { useEffect, useState } from "react";

export default function useRepositorySettings() {
	const [repositorySettings, setRepositorySettings] = useState([]);
	const [url, setUrl] = useState("http://localhost:37000");

	useEffect(() => {
		// Get stuff
		(async () => {
			const newRepositoryData = await fetch(
				"http://localhost:37002/RepositorySettings/getAll/")
				.then((res) => {
					console.log(`Success`);
					const data = res.json();
					return data;
				})
				.catch((err) => {
					console.log(`Couldn't fetch repository settings, server might be offline.`)
					console.log(err);
				});
			// console.log(`Repository data: `, newRepositoryData);
			setRepositorySettings(newRepositoryData["data"]);
		})();
	}, [url]);

	return {
		repositorySettings,
		setRepositorySettings,
		url,
		setUrl,
	};
}
