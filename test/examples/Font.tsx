import React, { FC } from "react";

const Font: FC<{className?: string}> = (props) => {
	return (
		<div>
			{props.children}
		</div>
	);
};

export { Font };