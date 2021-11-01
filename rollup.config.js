import pkg from './package.json';

const externalDeps = Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies });
const nodeDeps = ['path'];

export default {
  input: './src/index.js',
  external: externalDeps.concat(nodeDeps),
  output: [
    {
      file: pkg.exports['.'].require,
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    {
      file: pkg.exports['.'].import,
      format: 'esm',
      sourcemap: true,
    },
  ],
};
