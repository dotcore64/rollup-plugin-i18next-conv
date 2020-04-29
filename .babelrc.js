module.exports = ({ env }) => env('test')
  ? {
    plugins: ['istanbul'],
  }
  : {
    presets: [['@babel/env', { targets: { node: '10' } }]],
  };
