import { useEffect, useState } from "react";
import fetchRepositories, {
	fetchRepositoriesWithFetchAPI,
} from "../lib/fetch/fetchRepositories";

// const repositoryData = fetchRepositories();
// const repositoryDataFromFetchAPI = fetchRepositoriesWithFetchAPI();

export default function useRepositorySettings() {
	const [repositories, setRepositories] = useState([]);
	const [url, setUrl] = useState("http://localhost:37000");

	useEffect(() => {
		// Get stuff
		(async () => {
			const newRepositoryData = fetchRepositories();
			console.log(`Repository data: `, newRepositoryData);
		})();
	}, [url]);

	return {
		repositorySettings: repositories,
		setRepositorySettings: setRepositories,
		url,
		setUrl,
	};
}
