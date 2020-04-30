import pkg from './package.json';

const externalDeps = Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies });
const nodeDeps = ['path'];

export default {
  input: './src/index.js',
  external: externalDeps.concat(nodeDeps),
  output: [
    {
      file: pkg.main, format: 'cjs', exports: 'named', sourcemap: true,
    },
    { file: pkg.module, format: 'esm' },
  ],
};
