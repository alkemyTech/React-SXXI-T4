/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Formik, FieldArray, Form } from "formik";
import * as yup from "yup";
import { getSlides, putSlides } from "Services/Home/ApiService";
import {
  getOrganization, putOrganization
} from "Services/Organization/ApiService";

import LayoutForm from "Components/Layout/LayoutForm/LayoutForm";
import FormInputText from "Components/common/Form/FormInputText";
import FormError from "Components/common/Form/FormError";
import InputImage from "Components/common/Form/InputImage";
import FormTitle from "Components/common/Form/FormTitle";
import { FileExtension } from "utils/GetFileExtension/FileExtension";

export default function CategoriesForm() {
  const [dataSlide, setDataSlide] = useState([]);
  const [dataWelcomeText, setWelcomeText] = useState({});

  const message = "Este campo es obligatorio";

  useEffect(() => {
    getSlides(setDataSlide);
    getOrganization(setWelcomeText);
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
          putOrganization({
            welcome_text: values.welcome_text,
            name: dataWelcomeText.name
          });
          values.slides.forEach(element => {
            const result = FileExtension(element.image);
            if (!result) {
              putSlides(element);
            } else {
              putSlides({ id: element.id, name: element.name });
            }
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
        {({
          setFieldValue,
          handleChange,
          values,
          errors,
          handleBlur,
          touched,
        }) => (
          <div className="w-full h-full flex justify-center items-center">
            <Form>
              <div className="lg:shadow rounded-md h-auto m-auto  w-full sm:w-4/5 md:w-11/12 lg:w-4/5  bg-white py-7 px-3 lg:px-0">
                <FormTitle>Actualizar Home</FormTitle>
                <div className="mt-5">
                  <div className="w-full lg:w-11/12 mx-auto">
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
                  </div>

                  <div className="w-full lg:w-11/12 mx-auto mt-10">
                    <FieldArray name="slides">
                      {FieldArrayProps => {
                        const { form } = FieldArrayProps;
                        return (
                          <div className="w-full flex-col md:flex lg:flex-row lg:justify-between ">
                            {form.values.slides?.map((data, index) => {
                              return (
                                <div
                                  key={index}
                                  className="flex w-full  justify-between"
                                >
                                  <div className="w-1/3 h-32">
                                    <InputImage
                                      bgImage={data.image}
                                      FieldName={`slides[${index}].image`}
                                      setFieldValue={setFieldValue}
                                    />
                                  </div>
                                  <div className="w-full">
                                    <FormInputText
                                      type="text"
                                      name={`slides[${index}].name`}
                                      valueToShow={values.slides[index].name}
                                      handleChange={handleChange}
                                      handleBlur={handleBlur}
                                      placeholder="Ingresa el nombre del slide"
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        );
                      }}
                    </FieldArray>
                  </div>
                </div>
                <div className="relative w-full lg:w-11/12 mx-auto  py-10">
                  <button
                    type="submit"
                    className="absolute w-auto right-0 p-5 font-poppins py-2 bg-sky-800   tracking-wide 
								               rounded-lg  hover:bg-sky-500 hover:-translate-y-1 
									             transition-all duration-500 text-white text-lg font-medium"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </LayoutForm>
  );
}
