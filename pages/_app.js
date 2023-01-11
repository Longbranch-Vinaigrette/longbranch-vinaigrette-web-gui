import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Head from "next/head";

export default function App({ Component, pageProps }) {
	return (
		<div>
			<Head>
				<title>Development Tools</title>
			</Head>
			<main>
				{/* If components are created inside the _document.js,
				some things will not work */}
				<Navbar />
				<Component {...pageProps} />
			</main>
		</div>
	);
}
