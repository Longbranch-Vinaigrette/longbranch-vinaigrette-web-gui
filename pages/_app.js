import "../styles/globals.scss";

import TopNavbar from "../components/TopNavbar/TopNavbar";
import Navbar from "../components/Navbar/Navbar";
import Head from "next/head";
import { useEffect } from "react";

// Comprehensive storage and arbitrers
import ComprehensiveStorage from "../lib/data/ComprehensiveStorage/ComprehensiveStorage";
import PythonArbiter from "../lib/data/PythonArbiter/PythonArbiter";

// Add Comprehensive Storage to the global scope
globalThis.CS = new ComprehensiveStorage(
	new PythonArbiter("http://127.0.0.1:37000"),
	{
		collisionOptions: {
			allowCollisions: false,
			dontCreateUnitOnCollision: true,
		},
	}
);

// Append a unit
CS.createAndAppendUnit("servers", {
	// DevTools backend server
	devtoolsBackendServer: "http://127.0.0.1:37000",
	// This very server
	devtoolsFrontendServer: "http://127.0.0.1:37001",
	// DevTools database server
	devtoolsDatabaseServer: "http://127.0.0.1:37002",
});

export default function App({ Component, pageProps }) {
	useEffect(() => {
		// Set globally available props
		window.appInfo = {
			servers: {
				// DevTools backend server
				devtoolsBackendServer: "http://127.0.0.1:37000",
				// This very server
				devtoolsFrontendServer: "http://127.0.0.1:37001",
				// DevTools database server
				devtoolsDatabaseServer: "http://127.0.0.1:37002",
			},
		};
	}, []);

	return (
		<div>
			<TopNavbar></TopNavbar>
			<Navbar />
			<Head>
				<title>Development Tools</title>
			</Head>
			<main>
				{/* If components are created inside the _document.js,
				some things will not work */}
				<Component {...pageProps} />
			</main>
		</div>
	);
}
