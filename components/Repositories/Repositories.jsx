import { useEffect, useState } from "react";
import useRepositorySettings from "../../hooks/useRepositorySettings";

export default function Repositories() {
	const [name, setName] = useState("Perseverancia-company");
	const [toggle, setToggle] = useState(false);
	const { repositorySettings } = useRepositorySettings();

	return (
		<div>
			<h4>Repositories of {name}</h4>
			{/* Reference/s:
			https://www.w3schools.com/html/html_tables.asp
			https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
			
			If you don't use tbody with tables, it will crash the app and throw
			'hydration failed' error.
			This guy is truly the MVP of html tables xd
			https://github.com/vercel/next.js/discussions/36754?ysclid=lcsdk9vmzz136486139*/}
			<table>
				<tbody>
					<tr>
						<th>Repository name</th>
						<th>Enabled</th>
						<th>Configure</th>
					</tr>

					{/* Create elements for every repository/app */}
				</tbody>
			</table>
			{/* Toggle: {toggle ? "true" : "false"} */}
		</div>
	);
}
