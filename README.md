# API - Automation Test

Se crean APIS mockeadas para testear distintas llamadas (GET, POST, PUT, DELETE).
Haciendo referencia a un proceso de compra en un ecommerce.
Para la creacion de APIS con node js se utilizo <b>express</b> y para la escribir los tests <b>mocha y chai</b>

## Instalacion

    1- Clonar o descargar repositorio.
    2- Instalar con los siguientes comandos:
`npm init --y`<br />
`npm i express`<br />
`npm i joi`<br />
`npm i -g nodemon`<br />
`npm install mocha --save-dev`<br />
`npm install chai --save-dev`<br />
`npm install --save-dev mochawesome`

### Algunas configuraciones extra:
1. En el archivo package.json , ubicamos el objeto `scripts:{ }` y colocamos dentro `"test": "mocha",`
2. Hacemos enter, y en la linea de abajo colocamos: `"report": "mocha --reporter mochawesome --reporter-options reportDir=customReportDir,reportFilename=customReportFilename"`

## Como se corren los tests?

Abrimos una terminal en vscode posicionados en el proyecto y ejecutamos el comando
`npm run test`

## Como generar el reporte?
Abrimos una terminal en vscode posicionados en el proyecto y ejecutamos el comando
`npm run report` . Podemos visualizar el reporte en la carpeta customReportDir que se crea en el proyecto, donde podemos abrir el archivo .html en el navegador.

### Versiones utilizadas
- node v14.17.0
- npm 6.14.13