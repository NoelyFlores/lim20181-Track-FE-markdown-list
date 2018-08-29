const axios = require('axios');

const fileAsync = require('fs');

const Path = require('path');

const async = require('async');

const temp = [];
const option = {
  links: [],
  path: [],
  validate: false,
  stats: false,
};
const getOption = (args, callback) => {
  if (args.filter(element => element === '--validate').length >= 1) { option.validate = true; }
  if (args.filter(element => element === '--stats').length >= 1) { option.stats = true; }
  if (args.filter(element => element === '--stats' || element === '--validate').length === 0) { console.log('ERROR! sugerencia: [ --validate, -- status ó --validate --status]'); }
  callback(null, option);
};
const validateDirAbsolute = (path) => {
  let pathAbsoluta;
  if (!Path.isAbsolute(path)) {
    pathAbsoluta = Path.resolve(path);
  } else {
    pathAbsoluta = path;
  }
  return pathAbsoluta;
};
const getPath = (path, callback) => {
  (option.path).push(path);
  callback(null, option);
};
const filterURL = (text) => {
  const expresion = /=?\[(.*)\]\(((\ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?)\)/gi;
  const arrayURL = text.match(expresion);
  return arrayURL;
};
const getProperty = (property, nameProperty, values) => {
  Object.defineProperty(property, nameProperty, {
    value: values,
    writable: true,
    enumerable: true,
    configurable: true,
  });
};
const connectHttp = (Links, callback) => {
  if (Links) {
    async.map(Links, (link, callback2) => {
      axios.get(link.href)
        .then((response) => {
          const status = [{ name: 'status', value: response.status }, { name: 'statusText', value: response.statusText }];
          status.forEach((element) => {
            getProperty(link, element.name, element.value);
          });
          callback2(null, option);
        }).catch((error) => {
          const status = [{ name: 'status', value: error.response.status }, { name: 'statusText', value: 'Failed' }];
          status.forEach((element) => {
            getProperty(link, element.name, element.value);
          });
          callback2(null, option);
        });
    }, (err, results) => {
      callback(err, results);
    });
  }
};
const getStatsLinks = (Links, callback) => {
  if (Links) {
    const count = {};
    Links.forEach((link) => {
      const url = link.href;
      if (!Object.prototype.hasOwnProperty.call(count, url)) { count[url] = 0; }
      count[url] = 1 + count[url];
    });
    const unique = Object.keys(count).filter(link => count[link] === 1);
    const stats = [{ name: 'total', value: Links.length }, { name: 'unique', value: unique.length }];
    stats.forEach((element) => {
      getProperty(option, element.name, element.value);
    });
    callback(null, option);
  }
};
const getBrokenLinks = (Links, callback) => {
  if (Links) {
    let count = 0;
    option.links.forEach((valueActual) => {
      if (valueActual.statusText !== 'OK') {
        count += 1;
      }
    });
    const stats = [{ name: 'broken', value: count }];
    stats.forEach((element) => {
      getProperty(option, element.name, element.value);
    });
    callback(null, option);
  }
};
const filterMarkdown = (listFolder) => {
  const fileMarkdown = listFolder.filter(list => /\.md$|\.MD$|\.mD$|\.Md$/.test(list));
  return fileMarkdown;
};
const filterFileRecursive = (dir, callback) => { // recursividad
  fileAsync.readdir(dir, (error, listFolder) => { // retorna un array con el nombre del archivo
    listFolder.forEach((file) => {
      if (filterMarkdown([file]).length >= 1) {
        temp.push(Path.join(dir, filterMarkdown([file])[0]));
      }
      const path = Path.join(dir, file);
      return fileAsync.lstatSync(path).isDirectory()
        ? filterFileRecursive(path, callback)
        : { path };
    });
  });
  setTimeout(() => { callback(null, temp); }, 200);
};
const getPathOfDirectory = (path) => { // Promesa
  const promise = new Promise((resolve) => {
    filterFileRecursive(path, (Err, file) => {
      if (!Err) {
        option.path = file;
        resolve(option);
      }
    });
  });
  return promise;
};
module.exports = {
  validateDirAbsolute,
  getPath,
  getOption,
  connectHttp,
  getStatsLinks,
  getBrokenLinks,
  filterURL,
  getPathOfDirectory,
  filterMarkdown,
};
