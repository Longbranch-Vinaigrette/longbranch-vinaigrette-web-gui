import "../styles/globals.scss";
import Navbar from "../components/Navbar/Navbar";
import Head from "next/head";

export default function App({ Component, pageProps }) {
	return (
		<div>
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
