#!/usr/bin/env node
// import mdLinks from './src/index';
require('babel-register')({
  presets: ['env'],
});

const mdLinks = require('./src/index').mdLinks;

module.exports = mdLinks;

const [,, ...args] = process.argv;

if (args.length >= 1) {
  const [paht, ...option] = args;
  if (option.length >= 1) {
    mdLinks(paht, option).then((response) => {
      response.forEach((element) => {
        if (Object.keys(element).length >= 4) {
          console.log(element.file, element.href, element.statusText, element.status, element.text);
        } else {
          Object.keys(element).forEach((prop) => {
            console.log(prop, ': ', element[prop]);
          });
        }
      });
    }).catch((e) => {
      console.log(e);
    });
  } else {
    console.log('ERROR! sugerencia:\n md-links /..example/ [ --validate, -- status ó --validate --status]');
  }
} else {
  console.log('Carpeta o archivo indefinido');
}
