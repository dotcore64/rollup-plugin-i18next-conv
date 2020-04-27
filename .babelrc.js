module.exports = api => ({
  presets: [
    ['@babel/env', {
      targets: { node: api.env('test') ? 'current' : '10' },
    }]
  ],
  plugins: api.env('test') ? ['istanbul'] : [],
});
