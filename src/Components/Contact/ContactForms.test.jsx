import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ContactForm from "./ContactForm";

test("Render de formulario de contacto", async () => {
	render(<ContactForm />);

	const imageLogo = await screen.findByAltText("logo");
	const contributeText = await screen.findByText("¿Quieres contribuir?");
	const donateButton = await screen.findByText("Donar");
	const ContactUsText = await screen.findByText("¡Contactate con nosotros!");
	const inputName = await screen.findByPlaceholderText("Ingresa tu nombre");
	const inputEmail = await screen.findByPlaceholderText("Ingresa tu correo electronico");
	const inputPhone = await screen.findByPlaceholderText("Ingresa un telefono de contacto");
	const inputMessage = await screen.findByPlaceholderText("Ingresa tu mensaje..");
	const submitButton = await screen.findByText("Enviar mensaje");
	expect(imageLogo).toBeInTheDocument();
	expect(contributeText).toBeInTheDocument();
	expect(donateButton).toBeInTheDocument();
	expect(ContactUsText).toBeInTheDocument();
	expect(inputName).toBeInTheDocument();
	expect(inputEmail).toBeInTheDocument();
	expect(inputPhone).toBeInTheDocument();
	expect(inputMessage).toBeInTheDocument();
	expect(submitButton).toBeInTheDocument();
});
