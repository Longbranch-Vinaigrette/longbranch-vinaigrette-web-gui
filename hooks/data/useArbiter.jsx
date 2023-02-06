import { useEffect, useState } from "react";
import { v4 } from "uuid";

export default function useArbiter(route, dependencies = []) {
	const [id, setId] = useState(`${route}:${v4()}`);
	const [data, setData] = useState();

	// Create unit and retrieve data
	useEffect(() => {
		// Create arbiter unit
		let unit = CS.getUnit(id);
		unit ?? CS.createAndAppendArbiterUnit(route, id);

		(async () => {
			unit = CS.getUnit(id);
			// If there's no unit, return
			if (!unit) return;

			// Update data
			await unit.updateData(dependencies);

			// Get data
			setData((prev) => unit.getData());
		})();
	}, dependencies);

	return [data, id];
}
