import { useEffect } from "react";

export default function Element({ name, setToggle }) {
	return (
		<tr>
			<td>dev-gui</td>
			<td>
				<input
					type="checkbox"
					id={`repository/dev-gui/${name}`}
					onClick={() => setToggle((prev) => !prev)}
				/>
			</td>
			<td>
				<button type="button">Configure</button>
			</td>
		</tr>
	);
}
