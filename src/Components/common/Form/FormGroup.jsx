import React from "react";

export default function FormGroup({ children, style }) {
	return <div className={`w-auto ${style}`}>{children}</div>;
}
