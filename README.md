# Ong Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


ProgressBar.<br />

Barra de progreso para el renderizado del componente, se utilizara en el navbar.

Modo de uso.<br />
importar el componente, utilizarlo con sus diferentes propiedades.

<Progress  percent={15} milliseconds={4000} />

percent: porcentaje de inicio del progressBar.
milliseconds: selecciona el tiempo de carga del progressBar.


# Implementación de los esqueletos de carga en nuestras listas y tarjetas:

**Skeleton:** El skeleton se utilizó para mejorar la experiencia del usuario en la visualización de cartas y listas mientras se obtiene la información requerida. Se utilizó la libreria "Skeleton" de '@mui/material' (https://mui.com/material-ui/react-skeleton/)

Pasos para su uso: 

Paso 1.- Importar el componente que vamos a utilizar

Para el Skeleton de las cartas <SkeletonCard />

![image](https://user-images.githubusercontent.com/69809704/205689971-6a75fe9b-fc78-4e88-a59d-52d86427dfa3.png)

Para el Skeleton de las listas <SkeletonList />

![image](https://user-images.githubusercontent.com/69809704/205690184-ca027c67-4612-431e-b454-310faebb8212.png)

Paso 2.- Se lo coloca dentro de nuestro componente React, utilizando alguna condicional, para saber cuando debe mostrarse es Skeleton y cuando el componente.

![image](https://user-images.githubusercontent.com/69809704/205690622-0c0ca62e-5b1d-46bb-8356-2df9095ea518.png)


# Implementaciones:
**Spinner:** El spinner se realizo utilizando una plantilla de la pagina *https://cssloaders.github.io/* cambiando los colores por los principales de la pagina:
 * Rojo: `#DB5752`
 * Amarillo: `#FAFA88`
 * Azul: `#9AC9FB`
El mismo estara implementado durante la carga entre pantallas acompañado de un componente el cual indique el porcentaje de carga del mismo. Para el manejo de carga se utilizara Lazy ya que que la pagina evitara que se carguen recursos inecesarios afectando negativamente la experiencia del usuario/administrador.

