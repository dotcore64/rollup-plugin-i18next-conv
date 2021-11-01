import { basename, dirname } from 'path';
import { fileURLToPath } from 'url';
import { rollup } from 'rollup';
import { expect } from 'chai';

import i18next from 'rollup-plugin-i18next-conv'; // self-resolve

const dir = dirname(fileURLToPath(import.meta.url));
process.chdir(dir); // Needed for rollup to properly find inputs

describe('rollup-plugin-i18next-conv', () => {
  it('should convert po file', () => (
    rollup({
      input: 'samples/basic/main.js',
      plugins: [i18next()],
    }).then((
      (bundle) => bundle.generate({ format: 'cjs' })
    )).then(({ code }) => {
      // eslint-disable-next-line no-new-func
      const fn = new Function('expect', code);
      fn(expect);
    })
  ));

  it('should convert po file with custom determineDomain', () => (
    rollup({
      input: 'samples/custom/main.js',
      plugins: [i18next({ determineLocale: (filename) => basename(filename, '.po') })],
    }).then((
      (bundle) => bundle.generate({ format: 'cjs' })
    )).then(({ code }) => {
      // eslint-disable-next-line no-new-func
      const fn = new Function('expect', code);
      fn(expect);
    })
  ));

  it('should fail with invalid determineDomain', () => (
    rollup({
      input: 'samples/basic/main.js',
      plugins: [i18next({ determineLocale: () => { throw new Error('foo'); } })],
    }).then(() => {
      throw new Error('Should not arrive here');
    }).catch((err) => {
      expect(err.message).to.equal(`determineLocale failed for file ${dir}/samples/basic/locale/en/LC_MESSAGES/messages.po`);
    })
  ));

  it('should skip en.po', () => (
    rollup({
      input: 'samples/basic/main.js',
      plugins: [i18next({ exclude: 'samples/basic/locale/en/LC_MESSAGES/messages.po' })],
    }).then(() => {
      throw new Error('Should not arrive here');
    }).catch((err) => {
      expect(err.message).to.match(/Unexpected token/);
    })
  ));
});
