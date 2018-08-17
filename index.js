#!/usr/bin/env node

const axios = require('axios');

const fileAsync = require('fs');

const [,, ...args] = process.argv;
if (args.length >= 1) {
  const [paht, ...option] = args;
  console.log(paht, option);
  // [readme.md, ...[--validate --stats]] = readme.md --validate --stats
} else {
  console.log('Falta argumentar el paht');
}
const option = {
  links: [],
  paht: [],
  validate: false,
  stats: false,
};
const filterURL = (text) => {
  const expresion = /=?\[(.*)\]\(((\ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?)\)/gi;
  const arrayURL = text.match(expresion);
  return arrayURL;
};
const filterLinks = (optionPaht, callback) => {
  if (!optionPaht) {
    console.log('No existe la ruta');
  } else {
    const temp = [];
    let listinks;
    optionPaht.paht.forEach((file) => {
      fileAsync.readFile(file, 'utf-8', (err, text) => {
        if (!err) {
          if (text !== '') {
            listinks = filterURL(text);// filtro todos los links
            listinks.forEach((link) => {
              const textCC = link.match(/=?\[(.*)\]/gi);
              const hrefCP = link.match(/\(((\ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?)\)/gi);// obtengo solo url sin ()
              const text = textCC[0].slice(1, (textCC[0].length) - 1);
              const href = hrefCP[0].slice(1, hrefCP[0].length - 1);
              temp.push({ href, text, file });
            });
          }
          option.links = temp;
          callback(null, option.links);
        }
      });
    });
  }
  // return [{href,text,file}]
};
const filterMarkdown = (listFolder) => {
  const fileMarkdown = listFolder.filter(list => /.md$|.MD$/.test(list));
  return fileMarkdown;
};
const filterFile = (paht, callback) => {
  if (!paht) {
    console.log('No existe la ruta');
  } else {
    const lengthPaht = paht.length;
    const extencion = paht.slice(lengthPaht - 3, lengthPaht);
    if (extencion !== '.md') {
      fileAsync.readdir(paht, (error, listFolder) => { // retorna un array con el nombre del archivo
        if (!error) {
          const markdown = filterMarkdown(listFolder);
          (option.paht) = markdown;
        }
        callback(null, option);
      });
    }
    if (extencion === '.md' || extencion === '.MD') {
      (option.paht).push(paht);
      callback(null, option);
      /* filterLinks([paht]); */
    }
  }
};
const statsValidate = (Links, callback) => {
  if (!Links) {
    console.log('Erro broken');
  } else {
    let count = 0;
    const broken = option.links.reduce((valuePrevius) => {
      if (valuePrevius.status !== 'OK') {
        count ++;
      }
      console.log(count);
      return count;
    });
    Object.defineProperty(option, 'broken', {
      value: broken,
      writable: true,
      enumerable: true,
      configurable: true,
    });
    callback(null, option);   
  }
};
const viewStats = (Links, callback) => {
  if (!Links) {
    console.log('stats');
  } else {
    const count = {};
    Links.forEach((link) => {
      const url = link.href;
      if (!count.hasOwnProperty(url)) { count[url] = 0; }
      count[url] = 1 + count[url];
    });
    const unique = Object.keys(count).filter(link => count[link] === 1);
    Object.defineProperty(option, 'total', {
      value: Links.length,
      writable: true,
      enumerable: true,
      configurable: true,
    });
    Object.defineProperty(option, 'unique', {
      value: unique.length,
      writable: true,
      enumerable: true,
      configurable: true,
    });
    callback(null, option);
  }
};
const connectHttp = (Links, callback) => {
  if (!Links) {
    console.log('Error conexion');
  } else {
    const tempLink = [];
    Links.forEach((link) => {
      axios.get(link.href)
        .then((response) => {
          Object.defineProperty(link, 'status', {
            value: response.status,
            writable: true,
            enumerable: true,
            configurable: true,
          });
          Object.defineProperty(link, 'statusText', {
            value: response.statusText,
            writable: true,
            enumerable: true,
            configurable: true,
          });
          tempLink.push(link.href);
          callback(null, option);
        }).catch((error) => {
          Object.defineProperty(link, 'status', {
            value: error.response.status,
            writable: true,
            enumerable: true,
            configurable: true,
          });
          Object.defineProperty(link, 'statusText', {
            value: 'Failed',
            writable: true,
            enumerable: true,
            configurable: true,
          });
          tempLink.push(link.href);
          callback(null, option);
        });
    });
  }
};
const viewOption = (links, optionValidate, optionStats) => {
  if (optionValidate === '--validate') option.validate = true;
  if (optionStats === '--stats') option.stats = true;
  if (option.validate === true && option.stats === false) {
    connectHttp(links, (err) => {
      if (!err) {
        option.links.forEach((element) => {
          console.log(element.href, element.statusText, element.status, element.text);
        });
      }
    });
  }
  if (option.stats === true && option.validate === false) {
    viewStats(links, (err) => {
      if (!err) {
        console.log('Total: ', option.total, 'Unique: ', option.unique);
      }
    });
  }
  if (option.validate === true && option.stats === true) {
    connectHttp(links, (err) => {
      if (!err) {
        viewStats(option.links, (Err) => {
          if (!Err) {
            statsValidate(option.links, (error) => {
              if (!error) {
                console.log('Total: ', option.total, 'Unique: ', option.unique, 'Broken: ', option.broken);
              }
            });
          }
        });
      }
    });
  }
  /* if (listLinks.validate !== true && listLinks.stats !== true ){} */
};
// const mdLinks = (paht, { validate, stats }) => {
const mdLinks = (paht, validate, stats) => {
  const promise = new Promise((resolve, reject) => {
    if ('a' !== 'M') {
      filterFile(paht, (err, arrayPaht) => {
        if (!err) {
          filterLinks(arrayPaht, (error) => {
            if (!error) {
              resolve(viewOption(option.links, validate, stats));
            }
          });
        }
      });
    } else {
      reject(new Error('error oh no!'));
    }
  });
  return promise;
  // console.log('consola', paht, validate, stats); README2.md
};
