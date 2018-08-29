#!/usr/bin/env node
// import mdLinks from './src/index';
require('babel-register')({
  presets: ['env'],
});

const mdLinks = require('./src/index').mdLinks;

module.exports = mdLinks;

const [, , ...args] = process.argv;

if (args.length >= 1) {
  const [paht, ...option] = args;
  mdLinks(paht, option).then((response) => {
    response.forEach((element) => {
      if (Object.prototype.hasOwnProperty.call(element, 'status')) {
        console.log(element.file, element.href, element.statusText, element.status, element.text);
      }
      if (Object.prototype.hasOwnProperty.call(element, 'total')) {
        Object.keys(element).forEach((prop) => {
          console.log(prop, ': ', element[prop]);
        });
      }
      if (Object.prototype.hasOwnProperty.call(element, 'href') && Object.keys(element).length <= 3) {
        console.log(element.file, element.href, element.text);
      }
    });
  }).catch((e) => {
    console.log(e);
  });
} else {
  console.log('Carpeta o archivo indefinido');
}
