import React, { RefForwardingComponent, forwardRef } from "react";


type ButtonProps = {
	appearance?: "primary" | "secondary" | "ghost";
	bigSize?: boolean;
	iconStandalone?: boolean;
	textStyle?: boolean;
} & JSX.IntrinsicElements["button"];

const Button: RefForwardingComponent<HTMLButtonElement, ButtonProps>  = forwardRef<HTMLButtonElement, ButtonProps>((props: ButtonProps, ref) => <button ref={ref} {...props} />);

export { Button }

