import * as moduleMain from './main';

const fileAsync = require('fs');

const async = require('async');

const markdownAsync = (path, options) => {
  const promise = new Promise((resolve) => {
    async.waterfall(
      [
        (callback) => { // insert arg option
          if (options) {
            moduleMain.getOption(options, (err, result) => {
              if (!err) {
                callback(null, result);
              }
            });
          }
        },
        (option, callback) => { // insert path
          if (option.validate === true || option.stats === true) {
            const dirAbsolute = moduleMain.validateDirAbsolute(path);
            if (fileAsync.lstatSync(dirAbsolute).isFile()) {
              const filterMD = moduleMain.filterMarkdown([dirAbsolute]);
              if (filterMD.length === 0) {
                console.log('El archivo no es un marcado de texto');
              } else {
                moduleMain.getPath(dirAbsolute, (err, result) => {
                  if (!err) {
                    callback(null, result);
                  }
                });
              }
            } else {
              moduleMain.getPathOfDirectory(dirAbsolute).then((response) => {
                callback(null, response);
              });
            }
          }
        },
        (option, callback) => { // insert links
          if (option) {
            const tempLinks = [];
            let listinks;
            option.path.forEach((file) => {
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
                    option.links = tempLinks;
                  }
                }
              });
            });
            setTimeout(() => {
              if (option.links.length === 0) {
                console.log('No se encontraron links o archivos .md');
              }
              callback(null, option);
            }, 200);
          }
        },
        (option, callback) => { // insert stats and links broken
          if (option.validate === true && option.stats === false) {
            moduleMain.connectHttp(option.links, () => {
              callback(null, option.links);
            });
          }
          if (option.stats === true && option.validate === false) {
            moduleMain.getStatsLinks(option.links, () => {
              callback(null, [{ total: option.total, unique: option.unique }]);
            });
          }
          if (option.validate === true && option.stats === true) {
            moduleMain.connectHttp(option.links, (err) => {
              if (!err) {
                moduleMain.getStatsLinks(option.links, (Err) => {
                  if (!Err) {
                    moduleMain.getBrokenLinks(option.links, (error) => {
                      if (!error) {
                        callback(null, [
                          { total: option.total, unique: option.unique, broken: option.broken }]);
                      }
                    });
                  }
                });
              }
            });
          }
        },
      ], (err, result) => {
        if (!err) resolve(result);
      },
    );
  });
  return promise;
};
module.exports = {
  markdownAsync,
};
