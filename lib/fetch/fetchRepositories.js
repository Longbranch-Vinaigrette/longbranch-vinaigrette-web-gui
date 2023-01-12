import axios from "axios";

export default async function () {
	return new Promise(async (resolve, reject) => {
		const url = "http://localhost:37000";

		// Fetch every repository in repository_settings db
		const endpoint = `/sql/repositorySettings/getAll`;
		const fullUrl = `${url}${endpoint}`;
		console.log(`Fetching repositories at: ${fullUrl}`);

		try {
			const instance = axios.create({
				baseUrl: url,
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await instance
				.get(endpoint)
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
					console.log(Object.keys(err));
					console.log(`Error config: `, err["config"]);

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
