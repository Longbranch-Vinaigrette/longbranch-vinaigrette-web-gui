export default {
	// Wether the repository/app is considered deprecated or not
	deprecated: false,
	
	// App manager name
	"devtools": {
		// Public app name
		name: "Perseverancia Games",

		// App repository name
		repositoryName: "perseverancia-games",

		// App version
		version: "v1.0.0",

		// App description
		description: "Frontend website for perseverancia games.",

		// Main app type(next.js, react, python, nodejs, c++, etc.)
		appType: "Next.js",

		// Commands that we are able to run at the root of the app
		commands: {
			// Command to setup the app(Might not exist), if it exists this
			// will be runned before start
			setup: "npm i",
			// Command to build the app
			build: "next build",
			// Command to start the app, optionally add default args like port in this case
			start: "next start -p 38200",
		},
		// Arguments that the app can receive
		arguments: [
			{
				// The formal name of the argument
				formalName: "Port",
				// Prefix to start the argument with
				prefix: "-p",
				// Argument type:
				// Abbreviated:
				// int, str, boo
				// Complete:
				// integer, string, boolean
				argType: "int",
				// Argument description(necessary to show to the end user(which is me xd))
				description: "Sets the port of the app.",
			},
		],
		// Environment configuration
		env: {
			// Name of the environment file, I had to add this because the normal name should be
			// '.env', but next.js uses '.env.local'
			fileName: ".env.local",
			// Environment variables
			variables: [
				{
					// The formal name
					formalName: "Authentication url",
					// The variable name in the file
					varName: "NEXT_PUBLIC_AUTHENTICATION_SERVER_URL",
					// Description for the end users(me xD)
					description:
						"Server ip or fqdn for authentication related things, like logging in,\n register, etc",
				},
			],
		},
	},
};
