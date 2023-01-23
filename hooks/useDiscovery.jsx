import { useEffect, useState } from "react";

/**Probably gonna work on this very late, for now I just need this app to work
 * 
 * @param {*} props 
 * @returns 
 */
export default function useDiscovery(
	props = {
		// This will scan the last number from 0 to 256
		ip: [192, 168, 0],
		// Range is from where it starts to where it ends
		range: {
			start: [192, 168, 0, undefined],
			end: [192, 168, 0, undefined],
		},
	}
) {
	const [discovered, setDiscovered] = useState([]);

	const discover = () => {
		console.log(`Discoverer running:`);
		console.log(`Props: `, props);
		console.log(`Ip: `, props.ip);

		// Check if ip exists
		if (props && props.ip) {
			const fullAddress = `http://${String(props.ip[0])}.${String(
				props.ip[1]
			)}.${String(props.ip[2])}.`;
			for (let i = 0; i <= 256; i++) {
				const actualAddress = `${fullAddress}${String(i)}`;
				console.log(`Actual address: `, actualAddress);
			}
		}
	};

	useEffect(() => {
		console.log(`Discovering`);
		discover();
	}, []);

	return [discovered, setDiscovered];
}
