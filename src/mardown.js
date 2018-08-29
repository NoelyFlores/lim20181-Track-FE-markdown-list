import * as moduleMain from './main';

const fileAsync = require('fs');

const async = require('async');

const getOption = (args, callback) => {
  const option = {
    validate: false,
    stats: false,
  };
  if (args.filter(element => element === '--validate').length >= 1) { option.validate = true; }
  if (args.filter(element => element === '--stats').length >= 1) { option.stats = true; }
  if (args.filter(element => element === '--stats' || element === '--validate').length === 0) { console.log('Sugerencia: [ --validate, -- status ó --validate --status]'); }
  callback(null, option);
};
const markdownAsync = (path, options) => {
  const promise = new Promise((resolve, reject) => {
    async.waterfall(
      [
        (callback) => { // insert path
          const dirAbsolute = moduleMain.validateDirAbsolute(path);
          if (fileAsync.lstatSync(dirAbsolute).isFile()) {
            const filterMD = moduleMain.filterMarkdown([dirAbsolute]);
            if (filterMD.length === 0) {
              reject(new Error('El archivo no es un marcado de texto'));
            } else {
              moduleMain.getPath(dirAbsolute, (err, result) => {
                callback(null, result);
              });
            }
          } else {
            moduleMain.getPathOfDirectory(dirAbsolute).then((response) => {
              callback(null, response);// [readme.md, blam.md]
            });
          }
        },
        (option, callback) => { // insert links
          if (option.length !== 0) {
            const tempLinks = [];
            let listinks;
            async.map(option, (file, callback2) => {
              fileAsync.readFile(file, 'utf-8', (err, content) => {
                if (content !== '' || content !== null) {
                  listinks = moduleMain.filterURL(content);
                  if (listinks !== null) {
                    listinks.forEach((link) => {
                      const textCC = link.match(/=?\[(.*)\]/gi);
                      const hrefCP = link.match(/\(((\ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?)\)/gi);
                      const text = textCC[0].slice(1, textCC[0].indexOf(']', 1));
                      const href = hrefCP[0].slice(1, hrefCP[0].length - 1);
                      tempLinks.push({ href, text, file });
                    });
                  }
                }
                callback2(null, tempLinks);
              });
            }, (err) => {
              callback(err, tempLinks);
            });
          } else {
            reject(new Error('No existen archivos markdown'));
          }
        },
        (option, callback) => { // insert stats and links broken
          if (option.length !== 0) {
            if (options.validate === false && options.stats === false) {
              callback(null, option);
            }
            if (options.validate === true && options.stats === false) {
              moduleMain.connectHttp(option, (err, arrayLinks) => {
                callback(null, arrayLinks);
              });
            }
            if (options.stats === true && options.validate === false) {
              moduleMain.getStatsLinks(option, (err, arrayStat) => {
                callback(null, arrayStat);
              });
            }
            if (options.validate === true && options.stats === true) {
              moduleMain.connectHttp(option, (err, arrayLinks) => {
                moduleMain.getStatsLinks(arrayLinks, (Err, arrayStats) => {
                  moduleMain.getBrokenLinks(arrayLinks, (error, result) => {
                    callback(null, [
                      {
                        total: arrayStats[0].total,
                        unique: arrayStats[0].unique,
                        broken: result[0].broken,
                      }]);
                  });
                });
              });
            }
          } else {
            reject(new Error('No contro links en la direccion'));
          }
        },
      ], (err, result) => {
        resolve(result);
      },
    );
  });
  return promise;
};
module.exports = {
  markdownAsync,
  getOption,
};
