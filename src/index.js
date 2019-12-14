import path from 'path';
import { createFilter } from '@rollup/pluginutils';
import { gettextToI18next } from 'i18next-conv';

// third to last element of a path like
// /home/perrin4869/rollup-plugin-i18next-conv/test/samples/basic/locale/en/LC_MESSAGES/messages.po
const defDetermineLocale = filename => filename.split(path.sep).slice(-3)[0];

export default function i18next({
  include,
  exclude,
  determineLocale = defDetermineLocale,
  ...rest
} = {}) {
  const filter = createFilter(include, exclude);

  return {
    name: 'i18next-conv',

    transform(gettext, id) {
      if (id.slice(-3) !== '.po') return null;
      if (!filter(id)) return null;

      let locale;
      try {
        locale = determineLocale(id);
      } catch (e) {
        this.error(new Error(`determineLocale failed for file ${id}`));
      }

      return gettextToI18next(locale, gettext, rest)
        .then((json) => {
          const code = `export default ${json};`;

          // proceed with the transformation...
          return {
            code,
            map: { mappings: '' }, // i18next-conv does not support any mappings
          };
        });
    },
  };
}
