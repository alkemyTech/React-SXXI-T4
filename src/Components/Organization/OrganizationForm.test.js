import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter, Routes, Route } from "react-router";

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
	render(
		<Provider store={store}>
			<MemoryRouter initialEntries={["/backoffice/organizacion"]}>
				<Routes>
					<Route path="/backoffice/organizacion" element={<OrganizationForm showCKEditor={true} />} />
				</Routes>
			</MemoryRouter>
		</Provider>
	);

	//Se renderiza correctamente los componentes del formulario
	const inputName = await screen.findByPlaceholderText("Ingresa el nombre de la Organizacion");
	const inputImage = await screen.findByAltText("image");
	const inputLongDescription = await screen.findByPlaceholderText("Ingresa una descripcion larga");
	const inputShortDescription = await screen.findByPlaceholderText("Ingresa una descripcion corta");
	const inputFacebook = await screen.findByPlaceholderText("Ingresa la cuenta de facebook");
	const inputLinkedin = await screen.findByPlaceholderText("Ingresa la cuenta de linkedin");
	const inputInstagram = await screen.findByPlaceholderText("Ingresa la cuenta de instagram");
	const inputTwitter = await screen.findByPlaceholderText("Ingresa la cuenta de twitter");
	const submitButton = await screen.findByRole("button", { type: "submit" });
	expect(await screen.findByRole("heading", { level: 2 })).toContainHTML("Los datos de tu organizacion");
	expect(inputName).toBeInTheDocument();
	expect(inputImage).toBeInTheDocument();
	expect(inputLongDescription).toBeInTheDocument();
	expect(inputFacebook).toBeInTheDocument();
	expect(inputShortDescription).toBeInTheDocument();
	expect(inputLinkedin).toBeInTheDocument();
	expect(inputInstagram).toBeInTheDocument();
	expect(inputTwitter).toBeInTheDocument();
	expect(await screen.findByText("Enviar")).toBeInTheDocument();

	//Aparece los mensajes de error al no llenar los campos y submitear el formulario
	userEvent.click(submitButton);
	const errorMessages = await screen.findAllByText("*Este campo es requerido");
	expect(errorMessages.length).toBe(4);
	userEvent.type(inputName, "ONG somos mas");
	userEvent.type(inputLongDescription, "Descripcion larga");
	userEvent.type(inputShortDescription, "Descripcion corta");

	//Aparece error Formato no valido
	const imageGIF = new File(["(⌐□_□)"], "hello.gif", { type: "image/gif" });
	const imagePNG = new File(["(⌐□_□)"], "hello.png", { type: "image/png" });
	userEvent.upload(inputImage, imageGIF);
	expect(await screen.findByText("Seleccione un formato .png o .jpg.")).toBeInTheDocument();
	const buttonOKImage = await screen.findByText("OK");
	userEvent.click(buttonOKImage);
	userEvent.upload(inputImage, imagePNG);

	//Aparece error URL INVALIDO facebook y linkedin
	userEvent.type(inputFacebook, "asd");
	userEvent.type(inputLinkedin, "asd");
	userEvent.type(inputInstagram, "asd");
	userEvent.type(inputTwitter, "asd");
	const errorMessagesURL = await screen.findAllByText("*Ingresa una URL valida");
	expect(errorMessagesURL.length).toBe(4);
	userEvent.clear(inputFacebook);
	userEvent.type(inputFacebook, "https://www.facebook.com/Somos_Más");
	userEvent.clear(inputLinkedin);
	userEvent.type(inputLinkedin, "https://www.linkedin.com/Somos_Más");
	userEvent.clear(inputInstagram);
	userEvent.type(inputInstagram, "https://www.instagram.com/SomosMás");
	userEvent.clear(inputTwitter);
	userEvent.type(inputTwitter, "https://twitter.com/OngSomosMas1");

	//Testing sumbit del formulario
	const sendButton = await screen.findByRole("button", { type: "submit" });
	userEvent.click(sendButton);
	expect(await screen.findByText("¡Se actualizó con éxito!")).toBeInTheDocument();
});
