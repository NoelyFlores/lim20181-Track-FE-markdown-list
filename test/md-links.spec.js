import * as moduleMain from '../src/index';

jest.setTimeout(6000);
/* beforeEach(() => {
  moduleMain.mdLinks('./test/prueba/prueba-dos/markdown.md', ['--validate']);
}); */
// afterEach(fn, timeout)
test('Debería devolver un array de objetos para --validate', async (done) => {
  await moduleMain.mdLinks('./test/prueba', ['--validate']).then((data) => {
    expect(data).toEqual([
      {
        href: 'https://noelygithub.github.io/',
        text: 'gitHub',
        file: 'D:\\LABORATORIA\\PRUEVAS\\PROYECTO_MARKDOWN\\test\\prueba\\prueba.md',
        status: 404,
        statusText: 'Failed',
      },
      {
        href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
        text: 'aquí',
        file: 'D:\\LABORATORIA\\PRUEVAS\\PROYECTO_MARKDOWN\\test\\prueba\\prueba-dos\\markdown.md',
        status: 200,
        statusText: 'OK',
      }]);
    done();
  });
});
test('Debería devolver un array de objetos con propiedad total y unique de links status', async (done) => {
  await moduleMain.mdLinks('D:\\LABORATORIA\\PRUEVAS\\PROYECTO_MARKDOWN\\test\\prueba\\prueba-dos\\markdown.md', ['--stats']).then((data) => {
    expect(data).toEqual(expect.arrayContaining([{ total: 1, unique: 1 }]));
    done();
  });
});
test('Debería devolver un array de objeto con total de links rotos', async (done) => {
  await moduleMain.mdLinks('./test/prueba', ['--stats', '--validate']).then((data) => {
    expect(data).toEqual(expect.arrayContaining([{ total: 2, unique: 2, broken: 1 }]));
    done();
  });
});
test('Debería devolver no se encontraron links', async (done) => {
  expect(moduleMain.mdLinks('./test/prueba/vacio.md', ['--validate'])).rejects.toEqual(expect.any(Object));
  done();
});
test('Debería devolver un error de ruta no encontrada', async (done) => {
  await expect(moduleMain.mdLinks('./test/prueba/prueba.m', ['--validate'])).rejects.toEqual(expect.any(Object));
  done();
});
