import { basename } from 'node:path';
import { chdir } from 'node:process';

import { rollup, VERSION } from 'rollup';
import { expect, use } from 'chai';
import { dirname } from 'dirname-filename-esm';

// https://github.com/import-js/eslint-plugin-import/issues/1649
// eslint-disable-next-line import/no-unresolved
import i18next from 'rollup-plugin-i18next-conv'; // self-resolve

const dir = dirname(import.meta);
chdir(dir); // Needed for rollup to properly find inputs

// eslint-disable-next-line unicorn/no-await-expression-member
use((await import('chai-as-promised')).default);

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
    expect(rollup({
      input: 'fixtures/basic/main.js',
      plugins: [i18next({ determineLocale: () => { throw new Error('foo'); } })],
      // cannot determine whether the `de` or the `en` file will be processed and fail first
    })).to.be.rejectedWith(Error, new RegExp(`^determineLocale failed for file ${dir}/fixtures/basic/locale/(en|de)/LC_MESSAGES/messages.po$`))
  ));

  it('should skip en.po', () => (
    expect(rollup({
      input: 'fixtures/basic/main.js',
      plugins: [i18next({ exclude: 'fixtures/basic/locale/en/LC_MESSAGES/messages.po' })],
    })).to.be.rejectedWith(
      Error,
      VERSION.startsWith('4.')
        ? /Expected ';', '}' or <eof>/
        : /Unexpected token/,
    )
  ));
});
