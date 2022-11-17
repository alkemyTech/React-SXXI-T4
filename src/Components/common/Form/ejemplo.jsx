/* eslint-disable react/jsx-no-undef */
import React from "react";
import FormContainer from "./FormContainer";
import FormContainerImage from "./FormContainerImage";
import FormContainerInput from "./FormContainerInput";
import FormError from "./FormError";
import FormInputText from "./FormInputText";
import InputImage from "./InputImage";

export default function ejemplo() {
	return (
		<FormLayout>
			<Formik>
				<Form>
					<FormTitle>Titutlo</FormTitle>
					<FormContainer>
						<FormContainerImage>
							<InputImage />
							<FormError />
						</FormContainerImage>

						<FormContainerInput>
							<FormGroup>
								<FormInputText />
								<FormError />
							</FormGroup>

							<FormGroup>
								<FormInputText />
								<FormError />
							</FormGroup>

							<FormGroup>
								<FormInputText />
								<FormError />
							</FormGroup>
						</FormContainerInput>
					</FormContainer>

					<div className="relative p-10">
						<FormSubmitButton />
					</div>
				</Form>
			</Formik>
		</FormLayout>
	);
}
