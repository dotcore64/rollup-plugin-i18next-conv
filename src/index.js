import path from 'path';
import { createFilter } from '@rollup/pluginutils';
import { gettextToI18next } from 'i18next-conv';

// third to last element of a path like
// /home/perrin4869/rollup-plugin-i18next-conv/test/samples/basic/locale/en/LC_MESSAGES/messages.po
const defDetermineLocale = (filename) => filename.split(path.sep).slice(-3)[0];

const getLocale = (determineLocale, onError) => {
  try {
    return determineLocale();
  } catch (e) {
    onError(e);
    return undefined;
  }
};

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

      const locale = getLocale(
        () => determineLocale(id),
        () => this.error(new Error(`determineLocale failed for file ${id}`)),
      );

      return gettextToI18next(locale, gettext, rest)
        .then((json) => ({
          // proceed with the transformation...
          code: `export default ${json};`,
          map: { mappings: '' }, // i18next-conv does not support any mappings
        }));
    },
  };
}
