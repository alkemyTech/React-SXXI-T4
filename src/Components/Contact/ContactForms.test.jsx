import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ContactForm from "./ContactForm";

test("Render de formulario de contacto", async () => {
	render(<ContactForm />);

	await expect(screen.findByAltText("logo"));
	await expect(screen.findByText("¿Quieres contribuir?"));
	await expect(screen.findByText("Donar"));
	await expect(screen.findByText("¡Contactate con nosotros!"));
	await expect(screen.findByPlaceholderText("Ingresa tu nombre"));
	await expect(screen.findByPlaceholderText("Ingresa tu correo electronico"));
	await expect(screen.findByPlaceholderText("Ingresa un telefono de contacto"));
	await expect(screen.findByPlaceholderText("Ingresa tu mensaje.."));
	await expect(screen.findByRole("button", { type: "submit" }));
});
