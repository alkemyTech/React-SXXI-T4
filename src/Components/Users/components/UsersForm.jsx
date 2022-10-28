import React, { useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

const UserForm = ({ user }) => {
  const inputImage = useRef();
  const inputPassword = useRef();

  let initialValues = {
    name: user?.name || "",
    email: user?.email || "",
    password: user?.password || "",
    role_id: user?.role_id || "",
    profile_image: user?.profile_image || "",
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(4, "Minimo 4 caracteres")
      .required("Nombre obligatorio"),
    email: yup
      .string()
      .required("Email obligatorio")
      .email("Email invalido"),
    role_id: yup.string().required("Este campo es requerido"),
    password: yup
      .string()
      .required("Contraseña obligatoria")
      .min(8, "Minimo 8 caracteres"),
      profile_image: yup
      .string()
      .required("Imagen obligatoria")
  });

  const onSubmit = () => {
    if (user?.id) {
      axios
        .put(process.env.REACT_APP_API + "users/" + user.id, values)
        .then(() => {
          Swal.fire("Usuario modificado correctamente!");
        })
        .catch((err) => {
          Swal.fire("Error al modificar usuario :C intente con otro email");
        });
    } else {
      axios
        .post(process.env.REACT_APP_API + "users", values)
        .then(() => {
          Swal.fire("Usuario creado correctamente!");
        })
        .catch((err) => {
          Swal.fire("Error al crear usuario :C intente con otro email");
        });
    }
    resetForm()
  };
  const imageHandleChange = () => {
    if (inputImage?.current?.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(inputImage.current.files[0]);
      reader.addEventListener("load", () => {
        const url = reader.result;
        setFieldValue("profile_image", url);
      });
    }
  };
  const handleShowPassword = () => {
    if (inputPassword.current.type === "password") {
      inputPassword.current.type = "text";
    } else {
      inputPassword.current.type = "password";
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const {
    handleSubmit,
    errors,
    handleChange,
    handleBlur,
    values,
    touched,
    setFieldValue,
    resetForm,
  } = formik;

  return (
    <form
      className="  flex flex-col justify-center align-middle w-11/12 md:w-3/4 lg:w-2/4 h-screen gap-3 mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl text-center font-bold text-gray-500">
        Crear/Editar Usuario
      </h2>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className={`flex flex-col items-center justify-center w-32 h-32 border-2 rounded-full border-gray-300 border-dashed  cursor-pointer bg-gray-50  hover:bg-gray-100 bg-cover`}
          style={{ backgroundImage: `url('${values.profile_image}')` }}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
          </div>
          <input
            name="profile_image"
            type="file"
            accept=".jpg, .png"
            onChange={imageHandleChange}
            ref={inputImage}
            id="dropzone-file"
            hidden
          />
        </label>
      </div>
      {errors.profile_image && touched.profile_image && <div className="text-center">{errors.profile_image}</div>}
      <label>Nombre</label>
      <input
        className="input-field"
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Nombre"
      ></input>
      {errors.name && touched.name && <div>{errors.name}</div>}
      <label>Email</label>
      <input
        className="input-field"
        type="text"
        name="email"
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      ></input>
      {errors.email && touched.email && <div>{errors.email}</div>}
      <label>Contraseña</label>
      <div className="input-field flex flex-row justify-between">
        <input
          className="w-full h-full outline-none"
          type="password"
          name="password"
          placeholder="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          ref={inputPassword}
        ></input>
        <button type="button" onClick={handleShowPassword}>
          👀
        </button>
      </div>
      {errors.password && touched.password && <div>{errors.password}</div>}
      <label>Rol</label>
      <select
        name="role_id"
        className="input-field"
        value={values.role_id}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        <option value="" disabled>
          Select the role
        </option>
        <option value="1">Administrador</option>
        <option value="2">Usuario</option>
      </select>
      {errors.role_id && touched.role_id && <div>{errors.role_id}</div>}
      <button className="submit-btn" type="submit">
        Send
      </button>
    </form>
  );
};

export default UserForm;
