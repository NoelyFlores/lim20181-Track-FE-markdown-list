const axios = require('axios');

const fileAsync = require('fs');

const Path = require('path');

const async = require('async');

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
  const arrayPath = [];
  arrayPath.push(path);
  callback(null, arrayPath);
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
const connectHttp = (Links, callback) => { // [{ href, text, file }]
  const arrayLinks = Links;
  async.map(arrayLinks, (link, callback2) => {
    axios.get(link.href)
      .then((response) => {
        const status = [{ name: 'status', value: response.status }, { name: 'statusText', value: response.statusText }];
        status.forEach((element) => {
          getProperty(link, element.name, element.value);
        });
        callback2(null, arrayLinks);
      }).catch((error) => {
        if (error.response === undefined) {
          const status = [{ name: 'status', value: 'NOTFOUND' }, { name: 'statusText', value: 'Failed' }];
          status.forEach((element) => {
            getProperty(link, element.name, element.value);
          });
          callback2(null, arrayLinks);
        } else {
          const status = [{ name: 'status', value: error.response.status }, { name: 'statusText', value: 'Failed' }];
          status.forEach((element) => {
            getProperty(link, element.name, element.value);
          });
          callback2(null, arrayLinks);
        }
      });
  }, (err) => {
    callback(err, arrayLinks);
  });
};
const getStatsLinks = (Links, callback) => {
  const count = {};
  Links.forEach((link) => {
    const url = link.href;
    if (!Object.prototype.hasOwnProperty.call(count, url)) { count[url] = 0; }
    count[url] = 1 + count[url];
  });
  const unique = Object.keys(count).filter(link => count[link] === 1);
  const stats = [{ total: Links.length, unique: unique.length }];
  callback(null, stats);
};
const getBrokenLinks = (Links, callback) => {
  let count = 0;
  Links.forEach((valueActual) => {
    if (valueActual.statusText !== 'OK') {
      count += 1;
    }
  });
  const stats = [{ broken: count }];
  callback(null, stats);
};
const filterMarkdown = (listFolder) => {
  const fileMarkdown = listFolder.filter(list => /\.md$|\.MD$|\.mD$|\.Md$/.test(list));
  return fileMarkdown;
};
const filterFileRecursive = (dir, array, callback) => { // recursividad
  let temp = [];
  fileAsync.readdir(dir, (error, listFolder) => { // retorna un array con el nombre del archivo
    async.map(listFolder, (file, callback2) => {
      if (filterMarkdown([file]).length >= 1) {
        array.push(Path.join(dir, filterMarkdown([file])[0]));
        temp = array;
        callback2(null, array);
      }
      const path = Path.join(dir, file);
      return fileAsync.lstatSync(path).isDirectory()
        ? filterFileRecursive(path, array, callback)
        : { path };
    }, (err) => {
      callback(err, temp);
    });
  });
};
const getPathOfDirectory = (path) => { // Promesa
  const promise = new Promise((resolve) => {
    filterFileRecursive(path, [], (Err, file) => {
      resolve(file);
    });
  });
  return promise;
};
module.exports = {
  validateDirAbsolute,
  getPath,
  connectHttp,
  getStatsLinks,
  getBrokenLinks,
  filterURL,
  getPathOfDirectory,
  filterMarkdown,
};
