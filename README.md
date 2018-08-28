# Markdown Links

## Descripcíon General

## Instrucciones de instalación
#### Options

##### `--validate`

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```


##### `--stats`

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```
##### `--validate --stats`

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

## Versiones de libreria

## Documentación

### Herramientas de trabajo
Para empezar a desarrollar la libreria en NodeJS recopilo toda la informacion necesaria acerca de las herramientas que voy a utilizar y luego instalo las dependencias.
Las herramientas que escogi son `Eslint`, `Jest`, `Babel`, `axios` y `npm Async`
El linter me ayudara a evaluar los patrones de codigo en ES Modules
La instalación de eslint, jest y babel tomé como referencia al post de Lupo [Lupo](https://medium.com/laboratoria-developers/arquitectura-de-interfaces-web-parte-1-a41053c2a1f2)
  y de la documentación de [jest](https://jestjs.io/docs/en/getting-started) adicional a toda la 
  información que existe en estos sitios tuve que configurar el archivo `.eslintr` agregando las siguientes propiedades.
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

El paquete de la linea de comandos convierte un archivo de javascript `index.js` en un paquete local ejecutable por `npm`. Esto me permite ejecutar el archivo .js con `node` instalado localmente para hacer las pruevas durante el desarrollo de la libreria. Los pasos para su configuración son los siguientes.
Añado los siguientes caracteres dentro del archivo `index.js`,esto permitira buscar al node ejecutable instalado localmente.
```
#!/usr/bin/env node 
```
Luego todos los argumentos ingresados por la línea de comando estara almacenado como un array, el argumento `args` sera utilizado como parametro de una funcion.
```
const [,, ...args] = process.argv;
```
Ahora creo un nombre para el scritp de la linea de comando en `package.json`, esto hace que simule que el archivo sea un paquete instalado en `node`.
```
 "bin": {
    "md-links": "./cli.js"
  }
```
Por ultimo ejecutamos esta linea de comando en el terminal
```
npm link
```
Finalmente puedo ejecutar el scritp desde la linea de comando con el nombre que configure en package.json, para mayor información a cerca del paquete de linea de comando te invito a visitar [aquí](https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e)

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


## Estructura de datos
La estructura de datos se va construye de acuerdo a las condiciones que se requiere en la terminal. Si en el segundo parametro se encuentra el `--validate` agregara dos elementos a la propiedad links del objeto option, en el caso de encontrar un `--stats` se hara un push al mismo objeto con las propiedades total y unique. El ultimo caso, si en el segundo y tercer argumento se encuentra los valores `--validate` y `stats`hara las dos instrucciones anteriores ademas insertar la propiedad broken al objeto option.
```json
const option = [{
  links: {[href, text, file, status, statusText]},
  path: [dir],
  validate: false,
  stats: false,
  total: 0,
  unique: 0,
  broken: null,
}]
```
### Test

## Planificacion

- `path`: Ruta absoluta o relativa al archivo o directorio. Si la ruta pasada es relativa, debe resolverse como relativa al directorio desde donde se invoca node - _currentworking directory_).





