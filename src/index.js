import * as moduleMardown from './mardown';

const fileAsync = require('fs');

const mdLinks = (path, options) => {
  const promise = new Promise((resolve, reject) => {
    fileAsync.lstat(path, (err) => {
      if (err) {
        reject(new Error('No encontró la direccion'));
      } else {
        moduleMardown.markdownAsync(path, options).then((response) => {
          resolve(response);
        });
      }
    });
  });
  return promise;
};
module.exports = {
  mdLinks,
};
