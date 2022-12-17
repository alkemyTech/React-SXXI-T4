import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "./ContactForm";

test("Render de formulario de contacto", async () => {
	render(<ContactForm />);

	// Render components
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

	// Error Messages
	userEvent.click(submitButton);
	// Required
	const requireMessages = await screen.findAllByText("Este campo es requerido.");
	expect(requireMessages.length).toBe(4);
	// Email
	userEvent.type(inputEmail, "NotEmail");
	await screen.findByText("Debe ingresar un correo electronico valido.");
	// Phone
	userEvent.type(inputPhone, "text");
	await screen.findByText("Debe Contener valores numericos");
	userEvent.clear(inputPhone);
	userEvent.type(inputPhone, "1");
	await screen.findByText("Debe tener al menos 8 digitos");
	userEvent.clear(inputPhone);
	userEvent.type(inputPhone, "1234567890123");
	await screen.findByText("Debe tener un maximo de 12 digitos");

	// TODO: Success
});
