# Markdown Links

## Descripción General
Es una librería que te permite extraer la información de los links que se encuentra dentro de un marcador de texto que a su vez puede estar ubicado dentro de un archivo determinado. Los resultados se obtienen de acuerdo a la especificación que se desee; como las listas de todos los links con sus respectivas validaciones (http y https) a través del uso de la librería axios, la estadística del total de links, repeticiones y links inválidos.

## Guías de uso
### Versión
`v1.0.0`

### Instalación
```
npm install --save 
``` 
### Línea de comando
Antes de empezar a verificar los archivos markdown tendrá que seguir el siguiente formato.
```
md-links </route/> [options]
```
Donde:
- `md-links`: Es quien invoca la librería.
- `route`: Es la dirección de la carpeta o archivo a examinar, acepta rutas relativas y absolutas.
- `options`: Son las opciones a evaluar pueden ser 
  - `--stats `: Devuelve el número total de los links encontrados y el número de links únicos
  - `--validate`: Muestra los links con sus respectivas validaciones http, direccion y texto.
  - `--validate --stats` o `--stats --validate`: Muestra los resultados de la opción `stats` más el número de links rotos.
### Demo

## Documentación

### Herramientas de trabajo
Para empezar a desarrollar la librería en NodeJS recopilo toda la información necesaria acerca de las herramientas que voy a utilizar y luego instalo las dependencias.
Las herramientas que escogí son `Eslint`, `Jest`, `Babel`, `axios` y `npm Async`
El linter me ayudara a evaluar los patrones de código en ES Modules
La instalación de eslint, jest y babel tomé como referencia al post de [Lupo Montero](https://medium.com/laboratoria-developers/arquitectura-de-interfaces-web-parte-1-a41053c2a1f2)
  y de la documentación de [jest](https://jestjs.io/docs/en/getting-started) adicional a toda la información que existe en estos sitios tuve que configurar el archivo `.eslintr` agregando las siguientes propiedades.
```
{
"rules":{
        "linebreak-style": 0
      },
"env": {
        "jest": true
    
    },
}
  ```
al archivo `package.json` agregue las siguientes propiedades
  ```
{
"scripts": {
    "eslint": "eslint --ext .js src/ test/",
    "pretest": "eslint src test",
    "test": "jest --coverage"
  },
"jest": {
    "testURL": "http://localhost"
  },
 "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-preset-env": "^1.7.0",
    "eslint": "^5.3.0",
    "eslint-config-airbnb-base": "^13.0.0",
    "eslint-plugin-import": "^2.13.0",
    "jest": "^23.4.2"
  }
}
  ```
### Paquete de línea de comandos NodeJS

El paquete de la línea de comandos convierte un archivo de JavaScript `index.js` en un paquete local ejecutable por `npm`. Esto me permite ejecutar el archivo .js con `node` instalado localmente para hacer las pruebas durante el desarrollo de la librería. Los pasos para su configuración son los siguientes.
Añado los siguientes caracteres dentro del archivo `index.js`,esto permitirá buscar al node ejecutable instalado localmente.
```
#!/usr/bin/env node 
```
Luego todos los argumentos ingresados por la línea de comando estara almacenado como un array, el argumento `args` será utilizado como parámetro de una función.
```
const [,, ...args] = process.argv;
```
Ahora creo un nombre para el script de la línea de comando en `package.json`, esto hace que simule que el archivo sea un paquete instalado en `node`.
```
 "bin": {
    "md-links": "./cli.js"
  }
```
Por ultimo ejecutamos esta línea de comando en el terminal
```
npm link
```
Finalmente puedo ejecutar el script desde la línea de comando con el nombre que configure en package.json, para mayor información acerca del paquete de línea de comando te invito a visitar [aquí](https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e)

###  Instalacion axios
```
npm install axios
```
### Instalacion Async-npm 
```
$ npm install --save async
```
Luego configuro en mi archivo
```
const async = require("async");
```
## Arquitectura 
[arquitectura](http://subirimagen.me/uploads/20180823103623.PNG)

## Test
[Test asíncrono](http://subirimagen.me/uploads/20180829115333.PNG)
## Planificación
[sprint del proyecto](http://subirimagen.me/uploads/20180829115644.PNG)
[Tablero Kanban](http://subirimagen.me/uploads/20180829115750.PNG)
