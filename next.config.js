/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
	// Environment variables
	env: {
		// DevTools backend server
		DEV_TOOLS_BACKEND_SERVER_URL: "http://127.0.0.1:37000",
		// This very server
		DEV_TOOLS_FRONTEND_SERVER_URL: "http://127.0.0.1:37001",
		// DevTools database server
		DEV_TOOLS_DATABASE_SERVER_URL: "http://127.0.0.1:37002",
	},
	// Who knows)?
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
	// Sass options
	sassOptions: {
		includePaths: [
			path.join(__dirname, "styles"),
			path.join(__dirname, "components"),
		],
	},
};

module.exports = nextConfig;
