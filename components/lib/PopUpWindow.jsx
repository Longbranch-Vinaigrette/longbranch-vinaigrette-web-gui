import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import useMoveElementOnScroll from "../../hooks/css/positioning/useMoveElementOnScroll";
import styles from "./PopUpWindow.module.scss";

export default function PopUpWindow({
	Component,
	showPopUp,
	setShowPopUp,
	...args
}) {
	const popUpWindowId = uuidv4();

	// Move element along the user
	useMoveElementOnScroll(popUpWindowId);

	return (
		<span>
			{showPopUp && (
				<div className={styles.coverEverything} id={popUpWindowId}>
					{/* White box, where the content is inserted */}
					<div className={styles.whiteBox}>
						<div className={styles.subItem}>
							<Component {...args} />
						</div>
					</div>

					{/* Close the window */}
					<button
						className={styles.closeButton}
						onClick={() => setShowPopUp((prev) => !prev)}
					>
						Close
					</button>
				</div>
			)}
		</span>
	);
}
