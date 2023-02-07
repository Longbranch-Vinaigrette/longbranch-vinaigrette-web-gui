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
	const get = async (key) => {
		const unit = CS.getUnit(getRoute);
		return await unit.dispatch({
			key,
		});
	};

	return {
		set,
		get,
	};
}
