import * as moduleMardown from './mardown';

const fileAsync = require('fs');


// [--option, --validate]
const mdLinks = (path, options) => {
  const promise = new Promise((resolve, reject) => {
    fileAsync.lstat(path, (err) => {
      if (err) {
        reject(new Error('No encontró la direccion'));
      } else {
        moduleMardown.getOption(options, (error, option) => {
          moduleMardown.markdownAsync(path, option).then((response) => {
            resolve(response);
          }).catch((e) => {
            reject(new Error(e));
          });
        });
      }
    });
  });
  return promise;
};
module.exports = {
  mdLinks,
};
