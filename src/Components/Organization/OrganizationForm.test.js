import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter, Routes, Route } from "react-router";
import { act } from "react-dom/test-utils";
import OrganizationForm from "./OrganizationForm";
import store from "store/app/store";

import { setupServer } from "msw/node";
import { rest } from "msw";
window.scrollTo = jest.fn();

const handlers = [
	rest.get("https://ongapi.alkemy.org/public/api/organization/4", (req, res, ctx) => {
		return res(
			ctx.json({
				success: true,
				data: {
					id: 4,
					name: "",
					logo: "",
					short_description: "",
					long_description: "",
					welcome_text: "",
					address: "",
					phone: "",
					cellphone: "",
					created_at: "",
					updated_at: "",
					deleted_at: "",
					group_id: "",
					facebook_url: "",
					linkedin_url: "",
					instagram_url: "",
					twitter_url: "",
				},
				message: "Organization retrieved successfully",
			})
		);
	}),
	rest.put("https://ongapi.alkemy.org/api/organization/1", (req, res, ctx) => {
		return res(ctx.status(200));
	}),
];
export const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => {
	server.resetHandlers();
	cleanup();
});
afterAll(() => server.close());

test("Renderizacion de formulario de datos ONG,se validan los campos, mock de api y update de datos", async () => {
	act(() => {
		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={["/backoffice/organizacion"]}>
					<Routes>
						<Route path="/backoffice/organizacion" element={<OrganizationForm showCKEditor={true} />} />
					</Routes>
				</MemoryRouter>
			</Provider>
		);
	});
	//Se renderiza correctamente los componentes del formulario
	expect(await screen.findByRole("heading", { level: 2 })).toContainHTML("Los datos de tu organizacion");
	const inputName = await screen.findByPlaceholderText("Ingresa el nombre de la Organizacion");
	expect(inputName).toBeInTheDocument();
	const inputImage = await screen.findByAltText("image");
	expect(inputImage).toBeInTheDocument();
	const inputLongDescription = await screen.findByPlaceholderText("Ingresa una descripcion larga");
	expect(inputLongDescription).toBeInTheDocument();
	const inputShortDescription = await screen.findByPlaceholderText("Ingresa una descripcion corta");
	expect(inputShortDescription).toBeInTheDocument();
	const inputFacebook = await screen.findByPlaceholderText("Ingresa la cuenta de facebook");
	expect(inputFacebook).toBeInTheDocument();
	const inputLinkedin = await screen.findByPlaceholderText("Ingresa la cuenta de linkedin");
	expect(inputLinkedin).toBeInTheDocument();
	const inputInstagram = await screen.findByPlaceholderText("Ingresa la cuenta de instagram");
	expect(inputInstagram).toBeInTheDocument();
	const inputTwitter = await screen.findByPlaceholderText("Ingresa la cuenta de twitter");
	expect(inputTwitter).toBeInTheDocument();
	const submitButton = await screen.findByRole("button", { type: "submit" });
	expect(await screen.findByText("Enviar")).toBeInTheDocument();

	//Aparece los mensajes de error al no llenar los campos y submitear el formulario
	act(() => {
		fireEvent.click(submitButton);
	});
	const errorMessages = await screen.findAllByText("*Este campo es requerido");
	expect(errorMessages.length).toBe(4);
	act(() => {
		fireEvent.change(inputName, { target: { value: "ONG somos mas" } });
	});
	act(() => {
		fireEvent.change(inputLongDescription, { target: { value: "Descripcion larga" } });
	});
	act(() => {
		fireEvent.change(inputShortDescription, { target: { value: "Descripcion corta" } });
	});
	//Aparece error Formato no valido
	const imageGIF = new File(["(⌐□_□)"], "hello.gif", { type: "image/gif" });
	const imagePNG = new File(["(⌐□_□)"], "hello.png", { type: "image/png" });
	act(() => {
		userEvent.upload(inputImage, imageGIF);
	});
	expect(await screen.findByText("Seleccione un formato .png o .jpg.")).toBeInTheDocument();
	const buttonOKImage = await screen.findByText("OK");
	act(() => {
		fireEvent.click(buttonOKImage);
	});
	act(() => {
		userEvent.upload(inputImage, imagePNG);
	});

	//Aparece error URL INVALIDO facebook y linkedin
	act(() => {
		fireEvent.change(inputFacebook, { target: { value: "asd" } });
	});
	act(() => {
		fireEvent.change(inputLinkedin, { target: { value: "asd" } });
	});
	act(() => {
		fireEvent.change(inputInstagram, { target: { value: "asd" } });
	});
	act(() => {
		fireEvent.change(inputTwitter, { target: { value: "asd" } });
	});
	const errorMessagesURL = await screen.findAllByText("*Ingresa una URL valida");
	expect(errorMessagesURL.length).toBe(4);
	act(() => {
		fireEvent.change(inputFacebook, { target: { value: "https://www.facebook.com" } });
	});
	act(() => {
		fireEvent.change(inputLinkedin, { target: { value: "https://www.linkedin.com" } });
	});
	act(() => {
		fireEvent.change(inputInstagram, { target: { value: "https://www.instagram.com" } });
	});
	act(() => {
		fireEvent.change(inputTwitter, { target: { value: "https://www.twitter.com" } });
	});

	//Testing sumbit del formulario
	const submitButton2 = await screen.findByRole("button", { type: "submit" });
	expect(await screen.findByText("Enviar")).toBeInTheDocument();
	act(() => {
		fireEvent.click(submitButton2);
	});
	expect(await screen.findByText("¡Se actualizó con éxito!")).toBeInTheDocument();
});
