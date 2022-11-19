import React, { useEffect, useState } from "react";
import { Formik, ErrorMessage, Form, FieldArray } from "formik";
import * as yup from "yup";
import { convertBase64 } from "utils/ConvertBase64/ConvertBase64";
import { getSlides, putSlides } from "Services/Home/ApiService";
import {
  getOrganizationWelcome,
  putOrganizationWelcomeText,
} from "Services/Organization/ApiService";

import LayoutForm from "Components/Layout/LayoutForm/LayoutForm";
import Form from "Components/common/Form/Form";
import FormContainer from "Components/common/Form/FormContainer";
import FormContainerImage from "Components/common/Form/FormContainerImage";
import FormContainerInput from "Components/common/Form/FormContainerInput";
import FormInputText from "Components/common/Form/FormInputText";
import FormError from "Components/common/Form/FormError";
import FormGroup from "Components/common/Form/FormGroup";
import InputImage from "Components/common/Form/InputImage";

export default function CategoriesForm() {
  const [dataSlide, setDataSlide] = useState([]);
  const [dataWelcomeText, setWelcomeText] = useState({});

  const message = "Este campo es obligatorio";

  useEffect(() => {
    getSlides(setDataSlide);
    getOrganizationWelcome(setWelcomeText);
  }, []);

  return (
    <LayoutForm>
      <Formik
        initialValues={{
          welcome_text: dataWelcomeText.welcome_text || "",
          slides: [
            {
              id: dataSlide[0]?.id || "",
              name: dataSlide[0]?.name || "",
              image: dataSlide[0]?.image || "",
            },
            {
              id: dataSlide[1]?.id || "",
              name: dataSlide[1]?.name || "",
              image: dataSlide[1]?.image || "",
            },
            {
              id: dataSlide[2]?.id || "",
              name: dataSlide[2]?.name || "",
              image: dataSlide[2]?.image || "",
            },
          ],
        }}
        onSubmit={values => {
          putOrganizationWelcomeText(values.welcome_text, dataWelcomeText.name);
          values.slides.map(data => putSlides(data));

          Swal.fire({
            icon: "success",
            text: "Se Actualizaron los datos con éxito!",
          });
        }}
        validationSchema={() =>
          yup.object().shape({
            welcome_text: yup
              .string()
              .required(message)
              .min(20, "Deben ser al menos 20 caracteres"),
          })
        }
        enableReinitialize
      >
        {({ setFieldValue, handleChange, values, errors, handleBlur }) => (
          <Form>
            <FormContainer>
              <FormContainerInput>
                <FormGroup style="sm:col-span-2 lg:col-span-2">
                  <FormInputText
                    type="text"
                    name="welcome_text"
                    valueToShow={values.welcome_text}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    placeholder="Ingresa un mensaje de bienvenida"
                  />
                  <FormError
                    error={errors.welcome_text}
                    touched={touched.welcome_text}
                  />
                </FormGroup>
              </FormContainerInput>

              <FormContainerImage>
                <FieldArray name="slides">
                  {FieldArrayProps => {
                    const { form } = FieldArrayProps;
                    return (
                      <>
                        {form.values.slides?.map((data, index) => {
                          return (
                            <>
                              <FormGroup>
                                <FormInputText
                                  type="text"
                                  name={`slides[${index}].name`}
                                  valueToShow={values.slides[index].name}
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  placeholder="Ingresa el nombre del slide"
                                />
                              </FormGroup>
                              <FormGroup>
                                <InputImage
                                  bgImage={data.image}
                                  FieldName={`slides[${index}].image`}
                                  setFieldValue={setFieldValue}
                                />
                              </FormGroup>
                            </>
                          );
                        })}
                      </>
                    );
                  }}
                </FieldArray>
              </FormContainerImage>

              <div className="w-auto mt-2">
                <button
                  type="submit"
                  className=" px-6 py-2 bg-sky-600   tracking-wide 
														rounded-lg  hover:bg-sky-500 hover:-translate-y-1 
													transition-all duration-500 text-white text-lg font-medium"
                >
                  Actualizar datos
                </button>
              </div>
            </FormContainer>
            <div className="relative p-10">
              <FormSubmitButton />
            </div>
          </Form>
        )}
      </Formik>
    </LayoutForm>
  );
}
