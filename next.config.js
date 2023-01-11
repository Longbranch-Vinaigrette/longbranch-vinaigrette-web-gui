/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
	reactStrictMode: true,
	// Redirects
	async redirects() {
		// Reference/s
		// https://nextjs.org/docs/api-reference/next.config.js/redirects
		return [
			{
				source: "/",
				destination: "/home",
				permanent: true,
			},
		];
	},
	sassOptions: {
		includePaths: [
			path.join(__dirname, "styles"),
			path.join(__dirname, "components"),
		],
	},
};

module.exports = nextConfig;
