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

# Implementaciones:
**Spinner:** El spinner se realizo utilizando una plantilla de la pagina *https://cssloaders.github.io/* cambiando los colores por los principales de la pagina:
 * Rojo: `#DB5752`
 * Amarillo: `#FAFA88`
 * Azul: `#9AC9FB`
El mismo estara implementado durante la carga entre pantallas acompañado de un componente el cual indique el porcentaje de carga del mismo. Para el manejo de carga se utilizara Lazy ya que que la pagina evitara que se carguen recursos inecesarios afectando negativamente la experiencia del usuario/administrador.