import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
const { default: ContactForm } = require("./ContactForm");

test("render de formulario de contacto", async () => {
	render(<ContactForm />);
});
