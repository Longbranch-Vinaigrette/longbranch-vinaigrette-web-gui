import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

export default function codeEditor() {
	const onChange = React.useCallback((value, viewUpdate) => {
		console.log("value:", value);
	}, []);

	return (
		<div>
			<CodeMirror
				value="console.log('hello world!');"
				width="640px"
				height="480px"
				theme={oneDark}
				extensions={[javascript({ jsx: true })]}
				onChange={onChange}
			/>
		</div>
	);
}
