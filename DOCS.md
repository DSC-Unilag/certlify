# Certlify Developer Documentation

## Application Setup
See [README.md](README.md)

## Application Features
The application is built using micro-services architecture, so different parts of it are in different components. Each component having it's own routes and controllers.

### Routing
In each component, a route file named `component.router.js` is created. This is then registered in the general app base file located at `utils/app.js/setRoutes()`.

### Logging
To make the code clean and avoid unneccessary `console.log` statements. A `Logger` function has been built to be used to display important messages to the console.

### Environment Variables
Functions `getEnvVars` and `getPackagedVars` help retrieve `.env` variable and also `package.json` variables respectively.

### Response
The application uses a uniform response, structured by the `response` function.
