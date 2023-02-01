import { basename } from 'node:path';

import { rollup } from 'rollup';
import { expect } from 'chai';
import { dirname } from 'dirname-filename-esm';

// https://github.com/import-js/eslint-plugin-import/issues/1649
// eslint-disable-next-line import/no-unresolved
import i18next from 'rollup-plugin-i18next-conv'; // self-resolve

const dir = dirname(import.meta);
process.chdir(dir); // Needed for rollup to properly find inputs

describe('rollup-plugin-i18next-conv', () => {
  it('should convert po file', () => (
    rollup({
      input: 'fixtures/basic/main.js',
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
      input: 'fixtures/custom/main.js',
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
      input: 'fixtures/basic/main.js',
      plugins: [i18next({ determineLocale: () => { throw new Error('foo'); } })],
    }).then(() => {
      throw new Error('Should not arrive here');
    }).catch((e) => {
      expect(e.message).to.equal(`determineLocale failed for file ${dir}/fixtures/basic/locale/en/LC_MESSAGES/messages.po`);
    })
  ));

  it('should skip en.po', () => (
    rollup({
      input: 'fixtures/basic/main.js',
      plugins: [i18next({ exclude: 'fixtures/basic/locale/en/LC_MESSAGES/messages.po' })],
    }).then(() => {
      throw new Error('Should not arrive here');
    }).catch((e) => {
      expect(e.message).to.match(/Unexpected token/);
    })
  ));
});
