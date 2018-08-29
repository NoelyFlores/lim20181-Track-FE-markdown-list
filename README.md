# Markdown Links

## Descripción General
Es una librería que te permite extraer la información de los links que se encuentra dentro de un marcador de texto que a su vez puede estar ubicado dentro de un archivo determinado. Los resultados se obtienen de acuerdo a la especificación que se desee; como las listas de todos los links con sus respectivas validaciones (http y https) a través del uso de la librería axios, la estadística del total de links, repeticiones y links inválidos.

## Guías de uso
### Versión
`0.1.2`

### Instalación
```
npm i @noely/md-links
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
- Instalación

![install](https://scontent-scl1-1.xx.fbcdn.net/v/t1.15752-9/40337730_1684443978349862_7133657369728253952_n.png?_nc_cat=0&_nc_eui2=AeFeqZG7V1wGHzKQBp8gQklu37rp2FKOK3v1cSkn0pYAkaqLQmb3ZL6_4px1jYB3ecliJ6DKVRwNn7ybTUmchSXC__jYP0M5_xSnuUFDuOtcnA&oh=6ff56b1524d435c4e7ee25c1ae196700&oe=5C01EF45)

- Opción por default `md-links <route>`

![default](https://scontent-scl1-1.xx.fbcdn.net/v/t1.15752-9/40454743_2302736739742955_9189736348368502784_n.png?_nc_cat=0&_nc_eui2=AeHrN9CLBSxlfLCQTTfbXf0U8PaE2_3zIVYgNI-bZfPdJqb0rk6nbIuyqqewFHd_75OnwpUVKSS3wpMH3wGg5pTm8GLbTtwJ2L58Qpf-Ap4tmA&oh=9cb630db595722d843b816d24c1bc473&oe=5C02D7E9)
- Opción `md-links <route> --validate`

![validacion](https://scontent-scl1-1.xx.fbcdn.net/v/t1.15752-9/40358216_845105279210296_2040516589844955136_n.png?_nc_cat=0&_nc_eui2=AeE9hxleQ4RZk6pMWFFg-3DY1OV-ktiUY2FGhgzubT2NFbzhsYWzZtbOT1E1Pyq2MjAC6Wi969l8LUkckS79DNxS7U26Hbmn6NfA_FP91SYy7g&oh=fe884db1d54db36928faabc9c96bd669&oe=5BEDEE37)
- Opción `md-links <route> --stats`

![stats](https://scontent-scl1-1.xx.fbcdn.net/v/t1.15752-9/40297187_454657501698035_5215478572507987968_n.png?_nc_cat=0&_nc_eui2=AeEPTC-ZRavE4uCB7YeUv6xQVTFe_3o5crD6Pxra8BnzLfrboN5mbwR9hYYWwvJWHv29ObmVfl9odmOGARAwcg6VPCLe4-dTCAmRgs5rG9OwlA&oh=3fccbc90c48aefc4e53f8be50bf18120&oe=5BFD5125)
- optión `md-links <route> --validate --stats`

![twoption](https://scontent-scl1-1.xx.fbcdn.net/v/t1.15752-9/40325264_332091900896089_8177192632900911104_n.png?_nc_cat=0&_nc_eui2=AeGYXDmVLVwFuIuNlwkeE56tNpNvPVZ45ihx8PPVWPLDgPWmLTWCTb4BsU33CrB3YEHlAscMiqTdthO3dfIzAjKtONJCfs2Sas1yCIkY0MUCJQ&oh=9097b6f3b5441c2ee2ffe4416502893c&oe=5C32E83F)
### Validación

Md-links intenta controlar todas los errores que puede ingresar como argumento al terminal, las validaciones estan p:
- Cuando no encuentra archivos markdown
- La ruta no existe
- No es un jarchivo .md
- Sugerencias de uso.
Ejemplo
- Cuando no encuentra links en una dirección
![failed](https://scontent-scl1-1.xx.fbcdn.net/v/t1.15752-9/40449316_243278373052176_3195875222104309760_n.png?_nc_cat=0&_nc_eui2=AeHWe8qVq_Lfb7_iADa_vxOXZ4ocQyk1dxgQlVMpC-HPz8uHh7O4Kseqxo_QmWR3MD-BpsCl5dYLWdtRgPAW4NCsHPF5MPvjhP5k20jZiGtLJw&oh=3058a7694bb6b9846c26c422e2f0b234&oe=5BFC16E3)
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
![arquitectura](https://scontent-scl1-1.xx.fbcdn.net/v/t1.15752-9/40313215_459215017924509_6399351385271304192_n.png?_nc_cat=0&_nc_eui2=AeGwoQQuobsc2vmKPJtzidpsETMbGmgASEG7ojmcetLUUZxlYxFMvDCn2oMo-iR8E9wR-R4mr8B3-WAgResNdC8CbswRAM6js9d1D1wghIRWsw&oh=f9105b423c5e9eacb6b4af6f5390ef82&oe=5BF73282)

## Test
![Test asíncrono](https://scontent-scl1-1.xx.fbcdn.net/v/t1.15752-9/40330309_1842087795885476_1121814946267529216_n.png?_nc_cat=0&_nc_eui2=AeHzB7QhR5fSy2vUITlZB4HTBCPHM3gmRn8NPTO5G6KLZIjaP4wGOKk4GygL4Yz06YvNxfJkqiDtE1ayhd0hvKOCdTrUAISP601ISF2oKcGolA&oh=691e380f09cced140bed5b9ce9d56e86&oe=5BF4CC7B)
## Planificación
- Sprint de proyecto

![sprint del proyecto](https://scontent-scl1-1.xx.fbcdn.net/v/t1.15752-9/40352530_454920751674606_7162932210415173632_n.png?_nc_cat=0&_nc_eui2=AeFr7nAm4QmfDrXmvPrOfQk4GDbmuyiJ6qcGa8_pvAPVjyVCR4d7dMkOw1tvOD8-A73eSxSVYpE7x52_y_15qilG1wQev8_gMohOEGglW0tqwQ&oh=49a93037c41938197dafe95d0f54f923&oe=5BFAAA3B)
- Tablero kanban

![Tablero Kanban](https://scontent-scl1-1.xx.fbcdn.net/v/t1.15752-9/40377622_948337375359874_5112667213039403008_n.png?_nc_cat=0&_nc_eui2=AeGA6RpebpekWbXO6LCo_u2mp4pdL0bvWLPQlKDL5gWrjSqIIP0UPIrqq1j5zzoTxuQ_odExlcEPWDo8aAKivar4J1mdPYaiFxprOFtSLs11bQ&oh=594f5fee730431792f248b47925c9827&oe=5C2D5661)
