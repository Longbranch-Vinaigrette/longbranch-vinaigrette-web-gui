import { useEffect } from "react";
import styles from "./Configuration.module.scss";

export default function Configuration({
	repository,
	keyName,
	setAppSettings,
	setShowConfiguration,
}) {
	const rowId = `repository/${repository["user"]}/${repository["name"]}`;
	const configId = `${rowId}/config`;

	const handleStartAppClick = (event) => {};
	const handleStopAppClick = (event) => {};
	const handleRestartAppClick = (event) => {};
	const handleSetupAppClick = (event) => {};

	const getVerticalPosition = () => {
		if (scrollY) {
			// Usual
			return scrollY;
		} else if (document.documentElement.clientHeight) {
			// IE
			return document.documentElement.scrollTop;
		} else if (document.body) {
			// IE quirks
			return document.body.scrollTop;
		}
	};

	const moveConfigurationToUserPosition = () => {
		// Get vertical position
		const verticalPosition = getVerticalPosition();

		// Move element
		const element = document.getElementById(configId);
		if (element) {
			element.style.top = `${verticalPosition}px`;
		}
	};

	// Move element as the user scrolls
	window.onscroll = function (e) {
		moveConfigurationToUserPosition();
	};

	useEffect(() => {
		// On instantiation move to the user position
		moveConfigurationToUserPosition();
	});

	return (
		<div className={styles.coverEverything} id={configId}>
			<div className={styles.whiteBox}>
				<div className={styles.titleContainer}>
					<h4 className={styles.title}>{repository["name"]}</h4>
				</div>
				<div className={styles.buttons}>
					<button onClick={(event) => handleStartAppClick(event)}>
						Start app
					</button>
					<button onClick={(event) => handleStopAppClick(event)}>
						Stop app
					</button>
					<button onClick={(event) => handleRestartAppClick(event)}>
						Restart app
					</button>
					<button onClick={(event) => handleSetupAppClick(event)}>
						Setup app
					</button>
				</div>
			</div>

			<button
				className={styles.closeButton}
				onClick={() => setShowConfiguration((prev) => !prev)}
			>
				Close
			</button>
		</div>
	);
}
