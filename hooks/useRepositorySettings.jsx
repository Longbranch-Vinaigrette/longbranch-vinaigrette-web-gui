import { useEffect, useState } from "react";
import fetchRepositories from "../lib/fetch/fetchRepositories";

const repositoryData = fetchRepositories();

export default function useRepositorySettings() {
	const [repositories, setRepositories] = useState([]);
	const [url, setUrl] = useState("http://localhost:37000");

	return {
		repositorySettings: repositories,
		setRepositorySettings: setRepositories,
		url,
		setUrl,
	};
}
