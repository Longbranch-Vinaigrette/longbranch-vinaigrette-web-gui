import { useEffect } from "react";

export default function useMoveElementOnScroll(elementId) {
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
		const element = document.getElementById(elementId);
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
}
