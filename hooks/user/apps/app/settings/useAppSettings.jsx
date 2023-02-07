import { useEffect, useState } from "react";

export default function useAppSettings(path) {
	const [appSettings, setAppSettings] = useState();

	useEffect(() => {
		if (!path) return;

		// Create a unit and fetch app settings
		// The path can be a unique identifier so we don't need to create a new unit
		// each time
		const route = "/user/apps/app/settings/getSettings/";
		const alias = `${route}:${path}`;
		CS.getUnit(alias) ?? CS.createAndAppendArbiterUnit(route, alias);

		(async () => {
			const unit = CS.getUnit(alias);
			if (!unit) return;

			// Fetch data
			await unit.dispatch({ path });
			setAppSettings((prev) => unit.getData());
		})();
	}, [path]);

	return [appSettings];
}
