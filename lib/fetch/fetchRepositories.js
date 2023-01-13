import axios from "axios";

const url = "http://127.0.0.1:37000";
const endpoint = `/sql/repositorySettings/getAll`;
const globalQuery = `?website=dev-gui-website`;
const fullUrl = `${url}${endpoint}${globalQuery}`;

export default async function () {
	return new Promise(async (resolve, reject) => {
		// Fetch every repository in repository_settings db
		console.log(`Fetching repositories at: ${fullUrl}`);

		try {
			const instance = axios.create({
				baseUrl: url,
				headers: {
					"Content-Type": "application/json",
					// "Acces-Control-Allow-Origin": "*",
				},
			});

			const fullAxiosUrl = `${url}${endpoint}${globalQuery}&clientApi=axios`;
			console.log(`Full url: ${fullAxiosUrl}`);
			const data = await instance
				.get(`${endpoint}${globalQuery}&clientApi=axios`)
				.then((res) => {
					console.log(`Response: `, res);
					console.log(`Response body: `, res.body);
					console.log(`Data type: `, typeof res.body["data"]);
					setRepositories(res.body["data"]);

					// Resolve
					return res;
				})
				.catch((err) => {
					console.log(`fetchRepositories -> axios.get.catch(): Error`);
					console.log(`Error name: ${err["name"]}`);
					console.log(`Error message: ${err["message"]}`);
					console.log(`Error code: ${err["code"]}`);
					// Reject
					return err;
				});

			console.log(`Fetch end!`);
			resolve(data);
			return data;
		} catch (err) {
			console.log(`fetchRepositories -> catch(err):`);

			reject(data);
			return data;
		}
	});
}

export const fetchRepositoriesWithFetchAPI = async () => {
	return new Promise(async (resolve, reject) => {
		const fullFetchUrl = `${url}${endpoint}${globalQuery}&clientApi=fetch`;
		console.log(`Full fetch url: ${fullFetchUrl}`);
		await fetch(new URL(fullFetchUrl), {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			// If you use 'no-cors' it will not return the body.
			mode: "cors",
			cache: "default",
		})
			.then((res) => {
				console.log(`Data fetched successfully!`);
				console.log(`Data: `, res);
				return resolve();
			})
			.catch((err) => {
				console.log(`Error when trying to fetch using the fetch API`);
				console.log(`Error: `, err);
				return reject();
			});
	});
};
