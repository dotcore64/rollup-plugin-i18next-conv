# rollup-plugin-i18next-conv

[![Build Status][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coverage Status][coveralls-badge]][coveralls]

> Import po files as i18next compatible json objects with rollup

## Install

```
$ npm install --save-dev rollup-plugin-i18next-conv i18next-conv
```

Note: [i18next-conv](https://github.com/i18next/i18next-gettext-converter) is a peer dependency.

## Usage

Given the following source file:

```js
import i18next from 'i18next';

import en from '../../locale/en/LC_MESSAGES/messages.po';
import ja from '../../locale/ja/LC_MESSAGES/messages.po';

i18next.init({
  resources: {
    en: { translation: en },
    ja: { translation: ja },
  },
});
```

Compile using:

```js
// rollup.config.js
import i18next from 'rollup-plugin-i18next-conv';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
  },
  format: 'iife',

  plugins: [
    i18next({
      // All PO files will be parsed by default,
      // but you can also specifically include/exclude files
      include: 'node_modules/**',
      exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],
      
      // Customize the determineLocale function, which by default is:
      // const defDetermineLocale = filename => filename.split(path.sep).slice(-3)[0];
      // (returns 'en' given a filename './locale/en/LC_MESSAGES/messages.po')
      determineDomain: filename => path.basename(filename, '.po'),

      // And any option supported by i18next-conv's gettextToI18next function, for example
      keyseparator: '$$',
    })
  ]
};
```

[build-badge]: https://img.shields.io/github/actions/workflow/status/dotcore64/rollup-plugin-i18next-conv/test.yml?event=push&style=flat-square
[build]: https://github.com/dotcore64/rollup-plugin-i18next-conv/actions

[npm-badge]: https://img.shields.io/npm/v/rollup-plugin-i18next-conv.svg?style=flat-square
[npm]: https://www.npmjs.org/package/rollup-plugin-i18next-conv

[coveralls-badge]: https://img.shields.io/coveralls/dotcore64/rollup-plugin-i18next-conv/master.svg?style=flat-square
[coveralls]: https://coveralls.io/r/dotcore64/rollup-plugin-i18next-conv
