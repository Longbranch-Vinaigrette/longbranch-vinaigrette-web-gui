import { useEffect } from "react";

const setRoute = "/db/settings/set/";
const getRoute = "/db/settings/get/";

export default function useSettingsTable() {
	// Create arbiter unit
	useEffect(() => {
		// Set route
		CS.getUnit(setRoute) ?? CS.createAndAppendArbiterUnit(setRoute, setRoute);

		// Get route
		CS.getUnit(getRoute) ?? CS.createAndAppendArbiterUnit(getRoute, getRoute);
	}, []);

	// Set data
	const set = (key, data) => {
		const unit = CS.getUnit(setRoute);
		unit.dispatch({
			key,
			value: data,
		});
	};

	// Get data
	const get = (key) => {
		const unit = CS.getUnit(getRoute);
		unit.dispatch({
			key,
		});
		return unit.getData();
	};

	return {
		set,
		get,
	};
}
