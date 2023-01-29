import { useEffect, useState } from "react";

/**
 * @deprecated
 * @returns 
 */
export default function useRepositorySettings() {
	const [repositorySettings, setRepositorySettings] = useState([]);
	const [url, setUrl] = useState("http://localhost:37000");

	const setAppSettings = (keyName, data) => {
		// // Sub references also change on the parent but,
		// // because we are using react, this doesn't work.
		// repository["start_on_boot"] = !repository["start_on_boot"];

		// Update value
		const newRepository = {
			...repositorySettings[keyName],
			// The opposite of the actual value
			...data,
		};
		setRepositorySettings((prev) => {
			return {
				...prev,
				[keyName]: newRepository,
			};
		});
	};

	useEffect(() => {
		// Get stuff
		(async () => {
			const newRepositoryData = await fetch(
				"http://localhost:37002/RepositorySettings/getAll/"
			)
				.then((res) => {
					console.log(`Success`);
					const data = res.json();
					return data;
				})
				.catch((err) => {
					console.log(
						`Couldn't fetch repository settings, server might be offline.`
					);
					console.log(err);
					return err;
				});

			try {
				console.log(`Repository data: `, newRepositoryData);
				setRepositorySettings(newRepositoryData["data"]);
			} catch (err) {
				console.log(err);
			}
		})();
	}, [url]);

	return {
		repositorySettings,
		setRepositorySettings,
		url,
		setUrl,
		setAppSettings,
	};
}
