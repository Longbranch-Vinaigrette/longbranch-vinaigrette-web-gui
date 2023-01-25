import styles from "./Configuration.module.scss";

export default function Configuration({
	repository,
	keyName,
	setAppSettings,
	setShowConfiguration,
}) {
	return (
		<div className={styles.coverEverything}>
			<div className={styles.whiteBox}>
				<div className={styles.titleContainer}>
					<h4 className={styles.title}>{repository["name"]}</h4>
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
